import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@c8y/client";
/**
 * Service for managing tenant option credentials.
 */
export class TenantOptionCredentialsService {
    constructor(tenantOptions) {
        this.tenantOptions = tenantOptions;
        this.CATEGORY = 'my-custom.credentials';
    }
    /**
     * Saves the provided credentials and returns a token.
     * @param credentials - The credentials to be saved.
     * @returns A promise that resolves to the generated token.
     */
    saveCredentials(credentials) {
        const token = `${Math.floor(Math.random() * 1e16)}`;
        const username = this.tenantOptions.create({
            category: this.CATEGORY,
            key: `${token}.username`,
            value: credentials.username,
        });
        const password = this.tenantOptions.create({
            category: this.CATEGORY,
            key: `credentials.${token}.password`,
            value: credentials.password,
        });
        return Promise.all([username, password]).then(() => token);
    }
    /**
     * Retrieves the credentials associated with the provided token.
     * @param token - The token associated with the credentials.
     * @returns A promise that resolves to the username and password.
     */
    getCredentials(token) {
        return Promise.all([
            this.tenantOptions.detail({ category: this.CATEGORY, key: `${token}.username` }),
            this.tenantOptions.detail({ category: this.CATEGORY, key: `credentials.${token}.password` }),
        ]).then(([username, password]) => ({
            username: username.data.value,
            password: password.data.value,
        }));
    }
    /**
     * Deletes the credentials associated with the given token.
     * @param {string} token - The token for which the credentials should be deleted.
     * @returns {Promise<void>} - A promise that resolves when the credentials are successfully deleted.
     */
    deleteCredentials(token) {
        return Promise.all([
            this.tenantOptions.delete({ category: this.CATEGORY, key: `${token}.username` }),
            this.tenantOptions.delete({ category: this.CATEGORY, key: `credentials.${token}.password` }),
        ]);
    }
    clearAllCredentials() {
        return this.tenantOptions.list({ category: this.CATEGORY }).then((res) => {
            return res.data
                .filter((o) => o.category === this.CATEGORY)
                .map((option) => this.tenantOptions.delete(option));
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: TenantOptionCredentialsService, deps: [{ token: i1.TenantOptionsService }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: TenantOptionCredentialsService, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.14", ngImport: i0, type: TenantOptionCredentialsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.TenantOptionsService }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVuYW50LW9wdGlvbi1jcmVkZW50aWFscy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3RlbmFudC1vcHRpb24tY3JlZGVudGlhbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNM0M7O0dBRUc7QUFDSCxNQUFNLE9BQU8sOEJBQThCO0lBR3pDLFlBQW9CLGFBQW1DO1FBQW5DLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUZ0QyxhQUFRLEdBQUcsdUJBQXVCLENBQUM7SUFFTSxDQUFDO0lBRTNEOzs7O09BSUc7SUFDSCxlQUFlLENBQUMsV0FBbUQ7UUFDakUsTUFBTSxLQUFLLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixHQUFHLEVBQUUsR0FBRyxLQUFLLFdBQVc7WUFDeEIsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRO1NBQzVCLENBQUMsQ0FBQztRQUVILE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQ3pDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixHQUFHLEVBQUUsZUFBZSxLQUFLLFdBQVc7WUFDcEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxRQUFRO1NBQzVCLENBQUMsQ0FBQztRQUVILE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGNBQWMsQ0FBQyxLQUFhO1FBQzFCLE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLEtBQUssV0FBVyxFQUFFLENBQUM7WUFDaEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsZUFBZSxLQUFLLFdBQVcsRUFBRSxDQUFDO1NBQzdGLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQzdCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUs7U0FDOUIsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGlCQUFpQixDQUFDLEtBQWE7UUFDN0IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxXQUFXLEVBQUUsQ0FBQztZQUNoRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxlQUFlLEtBQUssV0FBVyxFQUFFLENBQUM7U0FDN0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG1CQUFtQjtRQUNqQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3ZFLE9BQU8sR0FBRyxDQUFDLElBQUk7aUJBQ1osTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQzNDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7K0dBNURVLDhCQUE4QjttSEFBOUIsOEJBQThCLGNBTDdCLE1BQU07OzRGQUtQLDhCQUE4QjtrQkFOMUMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUZW5hbnRPcHRpb25zU2VydmljZSB9IGZyb20gJ0BjOHkvY2xpZW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuLyoqXG4gKiBTZXJ2aWNlIGZvciBtYW5hZ2luZyB0ZW5hbnQgb3B0aW9uIGNyZWRlbnRpYWxzLlxuICovXG5leHBvcnQgY2xhc3MgVGVuYW50T3B0aW9uQ3JlZGVudGlhbHNTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBDQVRFR09SWSA9ICdteS1jdXN0b20uY3JlZGVudGlhbHMnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdGVuYW50T3B0aW9uczogVGVuYW50T3B0aW9uc1NlcnZpY2UpIHt9XG5cbiAgLyoqXG4gICAqIFNhdmVzIHRoZSBwcm92aWRlZCBjcmVkZW50aWFscyBhbmQgcmV0dXJucyBhIHRva2VuLlxuICAgKiBAcGFyYW0gY3JlZGVudGlhbHMgLSBUaGUgY3JlZGVudGlhbHMgdG8gYmUgc2F2ZWQuXG4gICAqIEByZXR1cm5zIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIHRoZSBnZW5lcmF0ZWQgdG9rZW4uXG4gICAqL1xuICBzYXZlQ3JlZGVudGlhbHMoY3JlZGVudGlhbHM6IHsgdXNlcm5hbWU6IHN0cmluZzsgcGFzc3dvcmQ6IHN0cmluZyB9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCB0b2tlbiA9IGAke01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDFlMTYpfWA7XG4gICAgY29uc3QgdXNlcm5hbWUgPSB0aGlzLnRlbmFudE9wdGlvbnMuY3JlYXRlKHtcbiAgICAgIGNhdGVnb3J5OiB0aGlzLkNBVEVHT1JZLFxuICAgICAga2V5OiBgJHt0b2tlbn0udXNlcm5hbWVgLFxuICAgICAgdmFsdWU6IGNyZWRlbnRpYWxzLnVzZXJuYW1lLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcGFzc3dvcmQgPSB0aGlzLnRlbmFudE9wdGlvbnMuY3JlYXRlKHtcbiAgICAgIGNhdGVnb3J5OiB0aGlzLkNBVEVHT1JZLFxuICAgICAga2V5OiBgY3JlZGVudGlhbHMuJHt0b2tlbn0ucGFzc3dvcmRgLFxuICAgICAgdmFsdWU6IGNyZWRlbnRpYWxzLnBhc3N3b3JkLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIFByb21pc2UuYWxsKFt1c2VybmFtZSwgcGFzc3dvcmRdKS50aGVuKCgpID0+IHRva2VuKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgdGhlIGNyZWRlbnRpYWxzIGFzc29jaWF0ZWQgd2l0aCB0aGUgcHJvdmlkZWQgdG9rZW4uXG4gICAqIEBwYXJhbSB0b2tlbiAtIFRoZSB0b2tlbiBhc3NvY2lhdGVkIHdpdGggdGhlIGNyZWRlbnRpYWxzLlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byB0aGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLlxuICAgKi9cbiAgZ2V0Q3JlZGVudGlhbHModG9rZW46IHN0cmluZykge1xuICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnRlbmFudE9wdGlvbnMuZGV0YWlsKHsgY2F0ZWdvcnk6IHRoaXMuQ0FURUdPUlksIGtleTogYCR7dG9rZW59LnVzZXJuYW1lYCB9KSxcbiAgICAgIHRoaXMudGVuYW50T3B0aW9ucy5kZXRhaWwoeyBjYXRlZ29yeTogdGhpcy5DQVRFR09SWSwga2V5OiBgY3JlZGVudGlhbHMuJHt0b2tlbn0ucGFzc3dvcmRgIH0pLFxuICAgIF0pLnRoZW4oKFt1c2VybmFtZSwgcGFzc3dvcmRdKSA9PiAoe1xuICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLmRhdGEudmFsdWUsXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmQuZGF0YS52YWx1ZSxcbiAgICB9KSk7XG4gIH1cblxuICAvKipcbiAgICogRGVsZXRlcyB0aGUgY3JlZGVudGlhbHMgYXNzb2NpYXRlZCB3aXRoIHRoZSBnaXZlbiB0b2tlbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHRva2VuIC0gVGhlIHRva2VuIGZvciB3aGljaCB0aGUgY3JlZGVudGlhbHMgc2hvdWxkIGJlIGRlbGV0ZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNyZWRlbnRpYWxzIGFyZSBzdWNjZXNzZnVsbHkgZGVsZXRlZC5cbiAgICovXG4gIGRlbGV0ZUNyZWRlbnRpYWxzKHRva2VuOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgdGhpcy50ZW5hbnRPcHRpb25zLmRlbGV0ZSh7IGNhdGVnb3J5OiB0aGlzLkNBVEVHT1JZLCBrZXk6IGAke3Rva2VufS51c2VybmFtZWAgfSksXG4gICAgICB0aGlzLnRlbmFudE9wdGlvbnMuZGVsZXRlKHsgY2F0ZWdvcnk6IHRoaXMuQ0FURUdPUlksIGtleTogYGNyZWRlbnRpYWxzLiR7dG9rZW59LnBhc3N3b3JkYCB9KSxcbiAgICBdKTtcbiAgfVxuXG4gIGNsZWFyQWxsQ3JlZGVudGlhbHMoKSB7XG4gICAgcmV0dXJuIHRoaXMudGVuYW50T3B0aW9ucy5saXN0KHsgY2F0ZWdvcnk6IHRoaXMuQ0FURUdPUlkgfSkudGhlbigocmVzKSA9PiB7XG4gICAgICByZXR1cm4gcmVzLmRhdGFcbiAgICAgICAgLmZpbHRlcigobykgPT4gby5jYXRlZ29yeSA9PT0gdGhpcy5DQVRFR09SWSlcbiAgICAgICAgLm1hcCgob3B0aW9uKSA9PiB0aGlzLnRlbmFudE9wdGlvbnMuZGVsZXRlKG9wdGlvbikpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=