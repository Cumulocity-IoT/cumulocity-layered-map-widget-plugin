import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/client";
export class MicroserviceService {
    constructor(fetch) {
        this.fetch = fetch;
        this.GET_OPTIONS = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.POST_OPTIONS = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.PUT_OPTIONS = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.DELETE_OPTIONS = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        this.defaultResponseHandler = async (response) => {
            if (!response.ok) {
                const errorMessage = await response.text();
                let message = `Request failed with status ${response.status}`;
                try {
                    const parsed = JSON.parse(errorMessage);
                    if (parsed.message) {
                        message = parsed.message;
                    }
                }
                catch {
                    // ignore JSON parse errors, use the status message
                }
                throw new Error(message);
            }
            if (response.status !== 204) {
                const data = await response.json();
                return data;
            }
        };
    }
    async get(url, responseHandler = this.defaultResponseHandler) {
        const response = await this.fetch.fetch(url, this.GET_OPTIONS);
        return responseHandler(response);
    }
    async post(url, data, responseHandler = this.defaultResponseHandler) {
        const options = cloneDeep(this.POST_OPTIONS);
        options.body = JSON.stringify(data);
        const response = await this.fetch.fetch(url, options);
        return responseHandler(response);
    }
    async put(url, data, responseHandler = this.defaultResponseHandler) {
        const options = cloneDeep(this.PUT_OPTIONS);
        options.body = JSON.stringify(data);
        const response = await this.fetch.fetch(url, options);
        return responseHandler(response);
    }
    async delete(url) {
        const response = await this.fetch.fetch(url, this.DELETE_OPTIONS);
        if (!response.ok) {
            throw new Error(`DELETE request failed with status ${response.status}`);
        }
        return response;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MicroserviceService, deps: [{ token: i1.FetchClient }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MicroserviceService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: MicroserviceService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.FetchClient }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWljcm9zZXJ2aWNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvbWljcm9zZXJ2aWNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sUUFBUSxDQUFDOzs7QUFLbkMsTUFBTSxPQUFPLG1CQUFtQjtJQXNEOUIsWUFBb0IsS0FBa0I7UUFBbEIsVUFBSyxHQUFMLEtBQUssQ0FBYTtRQXJEdEMsZ0JBQVcsR0FBa0I7WUFDM0IsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLGtCQUFrQjthQUNuQztTQUNGLENBQUM7UUFFRixpQkFBWSxHQUFrQjtZQUM1QixNQUFNLEVBQUUsTUFBTTtZQUNkLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsa0JBQWtCO2FBQ25DO1NBQ0YsQ0FBQztRQUVGLGdCQUFXLEdBQWtCO1lBQzNCLE1BQU0sRUFBRSxLQUFLO1lBQ2IsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7U0FDRixDQUFDO1FBRUYsbUJBQWMsR0FBa0I7WUFDOUIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSxrQkFBa0I7YUFDbkM7U0FDRixDQUFDO1FBRUYsMkJBQXNCLEdBQUcsS0FBSyxFQUFFLFFBQXdCLEVBQW9CLEVBQUU7WUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDakIsTUFBTSxZQUFZLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzNDLElBQUksT0FBTyxHQUFHLDhCQUE4QixRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBRTlELElBQUksQ0FBQztvQkFDSCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBeUIsQ0FBQztvQkFFaEUsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ25CLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO29CQUMzQixDQUFDO2dCQUNILENBQUM7Z0JBQUMsTUFBTSxDQUFDO29CQUNQLG1EQUFtRDtnQkFDckQsQ0FBQztnQkFFRCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFFRCxJQUFJLFFBQVEsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sSUFBSSxHQUFZLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUU1QyxPQUFPLElBQUksQ0FBQztZQUNkLENBQUM7UUFDSCxDQUFDLENBQUM7SUFFdUMsQ0FBQztJQUUxQyxLQUFLLENBQUMsR0FBRyxDQUNQLEdBQVcsRUFDWCxrQkFBa0UsSUFBSSxDQUFDLHNCQUFzQjtRQUU3RixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDL0QsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQ1IsR0FBVyxFQUNYLElBQWEsRUFDYixrQkFBa0UsSUFBSSxDQUFDLHNCQUFzQjtRQUU3RixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTdDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwQyxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN0RCxPQUFPLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUcsQ0FDUCxHQUFXLEVBQ1gsSUFBYSxFQUNiLGtCQUFrRSxJQUFJLENBQUMsc0JBQXNCO1FBRTdGLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFNUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXBDLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3RELE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVc7UUFDdEIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWxFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQ0FBcUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDMUUsQ0FBQztRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7K0dBbEdVLG1CQUFtQjttSEFBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzRGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGZXRjaENsaWVudCwgSUZldGNoT3B0aW9ucywgSUZldGNoUmVzcG9uc2UgfSBmcm9tICdAYzh5L2NsaWVudCc7XG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICdsb2Rhc2gnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWljcm9zZXJ2aWNlU2VydmljZSB7XG4gIEdFVF9PUFRJT05TOiBJRmV0Y2hPcHRpb25zID0ge1xuICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICB9LFxuICB9O1xuXG4gIFBPU1RfT1BUSU9OUzogSUZldGNoT3B0aW9ucyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH07XG5cbiAgUFVUX09QVElPTlM6IElGZXRjaE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH07XG5cbiAgREVMRVRFX09QVElPTlM6IElGZXRjaE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kOiAnREVMRVRFJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgIH0sXG4gIH07XG5cbiAgZGVmYXVsdFJlc3BvbnNlSGFuZGxlciA9IGFzeW5jIChyZXNwb25zZTogSUZldGNoUmVzcG9uc2UpOiBQcm9taXNlPHVua25vd24+ID0+IHtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XG4gICAgICBsZXQgbWVzc2FnZSA9IGBSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyAke3Jlc3BvbnNlLnN0YXR1c31gO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBKU09OLnBhcnNlKGVycm9yTWVzc2FnZSkgYXMgeyBtZXNzYWdlPzogc3RyaW5nIH07XG5cbiAgICAgICAgaWYgKHBhcnNlZC5tZXNzYWdlKSB7XG4gICAgICAgICAgbWVzc2FnZSA9IHBhcnNlZC5tZXNzYWdlO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gaWdub3JlIEpTT04gcGFyc2UgZXJyb3JzLCB1c2UgdGhlIHN0YXR1cyBtZXNzYWdlXG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDQpIHtcbiAgICAgIGNvbnN0IGRhdGE6IHVua25vd24gPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG5cbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGZldGNoOiBGZXRjaENsaWVudCkge31cblxuICBhc3luYyBnZXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgcmVzcG9uc2VIYW5kbGVyOiAocmVzcG9uc2U6IElGZXRjaFJlc3BvbnNlKSA9PiBQcm9taXNlPHVua25vd24+ID0gdGhpcy5kZWZhdWx0UmVzcG9uc2VIYW5kbGVyXG4gICk6IFByb21pc2U8dW5rbm93bj4ge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5mZXRjaC5mZXRjaCh1cmwsIHRoaXMuR0VUX09QVElPTlMpO1xuICAgIHJldHVybiByZXNwb25zZUhhbmRsZXIocmVzcG9uc2UpO1xuICB9XG5cbiAgYXN5bmMgcG9zdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBkYXRhOiB1bmtub3duLFxuICAgIHJlc3BvbnNlSGFuZGxlcjogKHJlc3BvbnNlOiBJRmV0Y2hSZXNwb25zZSkgPT4gUHJvbWlzZTx1bmtub3duPiA9IHRoaXMuZGVmYXVsdFJlc3BvbnNlSGFuZGxlclxuICApOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBjb25zdCBvcHRpb25zID0gY2xvbmVEZWVwKHRoaXMuUE9TVF9PUFRJT05TKTtcblxuICAgIG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoLmZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlSGFuZGxlcihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBwdXQoXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgZGF0YTogdW5rbm93bixcbiAgICByZXNwb25zZUhhbmRsZXI6IChyZXNwb25zZTogSUZldGNoUmVzcG9uc2UpID0+IFByb21pc2U8dW5rbm93bj4gPSB0aGlzLmRlZmF1bHRSZXNwb25zZUhhbmRsZXJcbiAgKTogUHJvbWlzZTx1bmtub3duPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNsb25lRGVlcCh0aGlzLlBVVF9PUFRJT05TKTtcblxuICAgIG9wdGlvbnMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoLmZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHJlc3BvbnNlSGFuZGxlcihyZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBkZWxldGUodXJsOiBzdHJpbmcpOiBQcm9taXNlPElGZXRjaFJlc3BvbnNlPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmZldGNoLmZldGNoKHVybCwgdGhpcy5ERUxFVEVfT1BUSU9OUyk7XG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYERFTEVURSByZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cbn1cbiJdfQ==