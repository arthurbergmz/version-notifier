# version-notifier

Let developers know when there is a new release of your package in their next development runtime.

### config object
```javascript
{
    packageName: 'myPackage', // optional
    currentVersion: '1.0.0', // optional
    provider: 'npm' // optional
}
```

### package.json
```json
{
    "name": "myPackage",
    "version": "1.0.0",
    "versionNotifier": {
        "provider": "npm"
    }
}
```
