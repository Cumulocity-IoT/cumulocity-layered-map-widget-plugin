import { QueryParser } from './query-parser';
import { Tokenizer } from './string-tokenizer';
export class ReverseQueriesUtil {
    convert(ast) {
        switch (ast.type) {
            case 'and':
                return {
                    __and: ast.nodes.map((node) => this.convert(node)),
                };
            case 'or':
                return {
                    __or: ast.nodes.map((node) => this.convert(node)),
                };
            case 'not':
                return {
                    __not: this.convert(ast.node),
                };
            case 'has':
                return {
                    __has: ast.fragment,
                };
            case 'bygroupid':
                return {
                    __bygroupid: ast.groupId,
                };
            case 'comparison': {
                const { field, operator, value } = ast;
                // eq is implicit in QueriesUtil JSON
                if (operator === 'eq') {
                    return { [field]: value };
                }
                return {
                    [field]: {
                        [`__${operator}`]: value,
                    },
                };
            }
            default: {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                throw new Error(`Unknown AST node type: ${ast['type']}`);
            }
        }
    }
    buildQueryJSON(query) {
        if (!query || query.length === 0) {
            return null;
        }
        try {
            // Strip $filter=() wrapper if present
            let processedQuery = query;
            if (processedQuery.startsWith('$filter=')) {
                processedQuery = processedQuery.substring(8); // Remove '$filter='
                if (processedQuery.startsWith('(') && processedQuery.endsWith(')')) {
                    processedQuery = processedQuery.slice(1, -1); // Remove outer parentheses
                }
            }
            const parser = new QueryParser(new Tokenizer(processedQuery));
            const syntaxTree = parser.parse();
            const json = this.convert(syntaxTree);
            return json;
        }
        catch (e) {
            console.error(e);
            return null;
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2ZXJzZS1xdWVyaWVzLXV0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaGVscGVycy9yZXZlcnNlLXF1ZXJpZXMtdXRpbC9yZXZlcnNlLXF1ZXJpZXMtdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRS9DLE1BQU0sT0FBTyxrQkFBa0I7SUFDckIsT0FBTyxDQUFDLEdBQVk7UUFDMUIsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakIsS0FBSyxLQUFLO2dCQUNSLE9BQU87b0JBQ0wsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNuRCxDQUFDO1lBRUosS0FBSyxJQUFJO2dCQUNQLE9BQU87b0JBQ0wsSUFBSSxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNsRCxDQUFDO1lBRUosS0FBSyxLQUFLO2dCQUNSLE9BQU87b0JBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztpQkFDOUIsQ0FBQztZQUVKLEtBQUssS0FBSztnQkFDUixPQUFPO29CQUNMLEtBQUssRUFBRSxHQUFHLENBQUMsUUFBUTtpQkFDcEIsQ0FBQztZQUVKLEtBQUssV0FBVztnQkFDZCxPQUFPO29CQUNMLFdBQVcsRUFBRSxHQUFHLENBQUMsT0FBTztpQkFDekIsQ0FBQztZQUVKLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQztnQkFDbEIsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUV2QyxxQ0FBcUM7Z0JBQ3JDLElBQUksUUFBUSxLQUFLLElBQUksRUFBRSxDQUFDO29CQUN0QixPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQztnQkFDNUIsQ0FBQztnQkFFRCxPQUFPO29CQUNMLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQ1AsQ0FBQyxLQUFLLFFBQVEsRUFBRSxDQUFDLEVBQUUsS0FBSztxQkFDekI7aUJBQ0YsQ0FBQztZQUNKLENBQUM7WUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNSLDRFQUE0RTtnQkFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQywwQkFBMEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxjQUFjLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDakMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0gsc0NBQXNDO1lBQ3RDLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQztZQUUzQixJQUFJLGNBQWMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztnQkFDMUMsY0FBYyxHQUFHLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQkFBb0I7Z0JBRWxFLElBQUksY0FBYyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxjQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQ25FLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsMkJBQTJCO2dCQUMzRSxDQUFDO1lBQ0gsQ0FBQztZQUVELE1BQU0sTUFBTSxHQUFHLElBQUksV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDOUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFakIsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlcnlQYXJzZXIgfSBmcm9tICcuL3F1ZXJ5LXBhcnNlcic7XG5pbXBvcnQgeyBBc3ROb2RlLCBRdWVyeUpzb24gfSBmcm9tICcuL3JldmVyc2UtcXVlcmllcy11dGlsLm1vZGVsJztcbmltcG9ydCB7IFRva2VuaXplciB9IGZyb20gJy4vc3RyaW5nLXRva2VuaXplcic7XG5cbmV4cG9ydCBjbGFzcyBSZXZlcnNlUXVlcmllc1V0aWwge1xuICBwcml2YXRlIGNvbnZlcnQoYXN0OiBBc3ROb2RlKTogUXVlcnlKc29uIHtcbiAgICBzd2l0Y2ggKGFzdC50eXBlKSB7XG4gICAgICBjYXNlICdhbmQnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIF9fYW5kOiBhc3Qubm9kZXMubWFwKChub2RlKSA9PiB0aGlzLmNvbnZlcnQobm9kZSkpLFxuICAgICAgICB9O1xuXG4gICAgICBjYXNlICdvcic6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgX19vcjogYXN0Lm5vZGVzLm1hcCgobm9kZSkgPT4gdGhpcy5jb252ZXJ0KG5vZGUpKSxcbiAgICAgICAgfTtcblxuICAgICAgY2FzZSAnbm90JzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBfX25vdDogdGhpcy5jb252ZXJ0KGFzdC5ub2RlKSxcbiAgICAgICAgfTtcblxuICAgICAgY2FzZSAnaGFzJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBfX2hhczogYXN0LmZyYWdtZW50LFxuICAgICAgICB9O1xuXG4gICAgICBjYXNlICdieWdyb3VwaWQnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIF9fYnlncm91cGlkOiBhc3QuZ3JvdXBJZCxcbiAgICAgICAgfTtcblxuICAgICAgY2FzZSAnY29tcGFyaXNvbic6IHtcbiAgICAgICAgY29uc3QgeyBmaWVsZCwgb3BlcmF0b3IsIHZhbHVlIH0gPSBhc3Q7XG5cbiAgICAgICAgLy8gZXEgaXMgaW1wbGljaXQgaW4gUXVlcmllc1V0aWwgSlNPTlxuICAgICAgICBpZiAob3BlcmF0b3IgPT09ICdlcScpIHtcbiAgICAgICAgICByZXR1cm4geyBbZmllbGRdOiB2YWx1ZSB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBbZmllbGRdOiB7XG4gICAgICAgICAgICBbYF9fJHtvcGVyYXRvcn1gXTogdmFsdWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgZGVmYXVsdDoge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L3Jlc3RyaWN0LXRlbXBsYXRlLWV4cHJlc3Npb25zXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBBU1Qgbm9kZSB0eXBlOiAke2FzdFsndHlwZSddfWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJ1aWxkUXVlcnlKU09OKHF1ZXJ5Pzogc3RyaW5nKTogb2JqZWN0IHwgbnVsbCB7XG4gICAgaWYgKCFxdWVyeSB8fCBxdWVyeS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICAvLyBTdHJpcCAkZmlsdGVyPSgpIHdyYXBwZXIgaWYgcHJlc2VudFxuICAgICAgbGV0IHByb2Nlc3NlZFF1ZXJ5ID0gcXVlcnk7XG5cbiAgICAgIGlmIChwcm9jZXNzZWRRdWVyeS5zdGFydHNXaXRoKCckZmlsdGVyPScpKSB7XG4gICAgICAgIHByb2Nlc3NlZFF1ZXJ5ID0gcHJvY2Vzc2VkUXVlcnkuc3Vic3RyaW5nKDgpOyAvLyBSZW1vdmUgJyRmaWx0ZXI9J1xuXG4gICAgICAgIGlmIChwcm9jZXNzZWRRdWVyeS5zdGFydHNXaXRoKCcoJykgJiYgcHJvY2Vzc2VkUXVlcnkuZW5kc1dpdGgoJyknKSkge1xuICAgICAgICAgIHByb2Nlc3NlZFF1ZXJ5ID0gcHJvY2Vzc2VkUXVlcnkuc2xpY2UoMSwgLTEpOyAvLyBSZW1vdmUgb3V0ZXIgcGFyZW50aGVzZXNcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZXIgPSBuZXcgUXVlcnlQYXJzZXIobmV3IFRva2VuaXplcihwcm9jZXNzZWRRdWVyeSkpO1xuICAgICAgY29uc3Qgc3ludGF4VHJlZSA9IHBhcnNlci5wYXJzZSgpO1xuICAgICAgY29uc3QganNvbiA9IHRoaXMuY29udmVydChzeW50YXhUcmVlKTtcbiAgICAgIHJldHVybiBqc29uO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG5cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19