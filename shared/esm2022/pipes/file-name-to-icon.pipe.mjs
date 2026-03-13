import { Pipe } from '@angular/core';
import { get } from 'lodash';
import * as i0 from "@angular/core";
export class FileNameToIconPipe {
    constructor() {
        this.fileTypeIconsMap = {
            'file-archive-o': ['7z', 'apk', 'cab', 'gz', 'iso', 'jar', 'rar', 'tar', 'zip'],
            excel: ['xls', 'xlsx'],
            'image-file': ['bmp', 'gif', 'png', 'svg', 'ico'],
            jpg: ['jpeg', 'jpg'],
            tif: ['tiff'],
            pdf: ['pdf'],
            ppt: ['ppt', 'pptx'],
            'file-text': ['txt'],
            'file-video-o': ['3gp', 'asf', 'avi', 'flv', 'mov', 'mp4', 'ogv', 'qt', 'rm', 'rmvb', 'wmv'],
            word: ['doc', 'docx'],
        };
        this.fileNameRegexp = /(?:\.([^.]+))?$/;
    }
    /**
     * Returns the icon for a specific binary.
     */
    transform(name) {
        if (!name) {
            return 'file';
        }
        const [, suffix] = this.fileNameRegexp.exec(name);
        for (const icon of Object.keys(this.fileTypeIconsMap)) {
            if (get(this.fileTypeIconsMap, icon).includes(suffix)) {
                return icon;
            }
        }
        return 'file';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FileNameToIconPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe }); }
    static { this.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.14", ngImport: i0, type: FileNameToIconPipe, name: "fileNameToIcon" }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: FileNameToIconPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'fileNameToIcon' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1uYW1lLXRvLWljb24ucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9waXBlcy9maWxlLW5hbWUtdG8taWNvbi5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBQ3BELE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxRQUFRLENBQUM7O0FBRzdCLE1BQU0sT0FBTyxrQkFBa0I7SUFEL0I7UUFFRSxxQkFBZ0IsR0FBZ0M7WUFDOUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUMvRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQ3RCLFlBQVksRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUM7WUFDakQsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztZQUNwQixHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDYixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDWixHQUFHLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO1lBQ3BCLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUNwQixjQUFjLEVBQUUsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDO1lBRTVGLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUM7U0FDdEIsQ0FBQztRQUVGLG1CQUFjLEdBQUcsaUJBQWlCLENBQUM7S0FvQnBDO0lBbEJDOztPQUVHO0lBQ0gsU0FBUyxDQUFDLElBQVk7UUFDcEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxELEtBQUssTUFBTSxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDO1lBQ3RELElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDdEQsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7K0dBbENVLGtCQUFrQjs2R0FBbEIsa0JBQWtCOzs0RkFBbEIsa0JBQWtCO2tCQUQ5QixJQUFJO21CQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJztcblxuQFBpcGUoeyBuYW1lOiAnZmlsZU5hbWVUb0ljb24nIH0pXG5leHBvcnQgY2xhc3MgRmlsZU5hbWVUb0ljb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGZpbGVUeXBlSWNvbnNNYXA6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nW10gfSA9IHtcbiAgICAnZmlsZS1hcmNoaXZlLW8nOiBbJzd6JywgJ2FwaycsICdjYWInLCAnZ3onLCAnaXNvJywgJ2phcicsICdyYXInLCAndGFyJywgJ3ppcCddLFxuICAgIGV4Y2VsOiBbJ3hscycsICd4bHN4J10sXG4gICAgJ2ltYWdlLWZpbGUnOiBbJ2JtcCcsICdnaWYnLCAncG5nJywgJ3N2ZycsICdpY28nXSxcbiAgICBqcGc6IFsnanBlZycsICdqcGcnXSxcbiAgICB0aWY6IFsndGlmZiddLFxuICAgIHBkZjogWydwZGYnXSxcbiAgICBwcHQ6IFsncHB0JywgJ3BwdHgnXSxcbiAgICAnZmlsZS10ZXh0JzogWyd0eHQnXSxcbiAgICAnZmlsZS12aWRlby1vJzogWyczZ3AnLCAnYXNmJywgJ2F2aScsICdmbHYnLCAnbW92JywgJ21wNCcsICdvZ3YnLCAncXQnLCAncm0nLCAncm12YicsICd3bXYnXSxcblxuICAgIHdvcmQ6IFsnZG9jJywgJ2RvY3gnXSxcbiAgfTtcblxuICBmaWxlTmFtZVJlZ2V4cCA9IC8oPzpcXC4oW14uXSspKT8kLztcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgaWNvbiBmb3IgYSBzcGVjaWZpYyBiaW5hcnkuXG4gICAqL1xuICB0cmFuc2Zvcm0obmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybiAnZmlsZSc7XG4gICAgfVxuXG4gICAgY29uc3QgWywgc3VmZml4XSA9IHRoaXMuZmlsZU5hbWVSZWdleHAuZXhlYyhuYW1lKTtcblxuICAgIGZvciAoY29uc3QgaWNvbiBvZiBPYmplY3Qua2V5cyh0aGlzLmZpbGVUeXBlSWNvbnNNYXApKSB7XG4gICAgICBpZiAoZ2V0KHRoaXMuZmlsZVR5cGVJY29uc01hcCwgaWNvbikuaW5jbHVkZXMoc3VmZml4KSkge1xuICAgICAgICByZXR1cm4gaWNvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJ2ZpbGUnO1xuICB9XG59XG4iXX0=