# version-notifier

Let developers know when there is a new release of your package in their next development runtime.

Out-of-the-box providers will only send you version notifications from your application's dependencies, and not from dependencies of your dependencies. Notifications can be disabled in production environments by using the environment variable `NODE_ENV=production` or `NODE_ENV=prod`.

You can also specify custom resolvers, so you don't have to rely on NPM's availability.

### Install

This is a [Node.js](https://nodejs.org/en/) module. Therefore, beforehand, you need to [download and install Node.js](https://nodejs.org/en/download/).

Assuming that you have already used the `npm init` command, run:

```bash
$ npm install version-notifier --save
```

### Getting started

You can call `version-notifier` anytime on your runtime, but it is recommended to call it as soon as your app starts. For example, in your `index.js`, in your root directory:

**ES6+**
```javascript
import checkVersion from 'version-notifier'
checkVersion(__dirname)
```
**ES5**
```javascript
var checkVersion = require('version-notifier')
checkVersion(__dirname)
```

The first argument must always be the root directory of your app.

### How to configure

##### package.json

You can specify a different provider through `versionNotifier.provider` on your `package.json`. Out-of-the-box providers: `npm`.

```json
{
    "name": "myPackage",
    "version": "1.0.0",
    "versionNotifier": {
        "provider": "npm"
    }
}
```

Or you can create your very own version provider by the time you call `version-notifier`:

##### Custom version providers

```javascript
checkVersion(__dirname, function (packageName, currentVersion, log) {
    // your magic
    log('I have just checked my custom provider for a new version of ' + packageName + '.')
})
```

### Function Parameters

#### checkVersion(appRootDirectory, customProvider, log)

**appRootDirectory**

Type: `string`

The *root directory* of your application. If your main file is already in the *root directory*, just use `__dirname` here. Otherwise, you must use specify how to go to your *root directory* still using `__dirname`. For example, if you are calling `version-notifier` inside a subfolder of your *root directory*, you must use `path.join(__dirname, '..')` to get the relative path of your *root directory*.

I used *root directory* here multiples times because getting the right directory for your app is a must for a fully working environment. Using `__dirname`, your project can be used as a dependency in other projects.

**customProvider**

Type: `function` or `object`

You can use `version-notifier` with totally different environments from NPM, with support for alternative dependency checking:

```typescript
{
    isDependency: function (parentDependenciesJson: JSON, dependencyName: string) : boolean,
    resolver: function (packageName: string, currentVersion: string, log: function) : void
}
```

Or if you are still using `package.json` for your project, you can just use a function:

```typescript
function (packageName: string, currentVersion: string, log: function) : void
```

Versions ideally follow [semver](https://semver.org/), but it is not a rule since you can create your own custom providers.

**log**

Type: `function`

Custom logging function for the results.

```typescript
function (err?: Error, message?: string) : void
```

### Team

Created and developed by [Arthur Arioli Bergamaschi](https://github.com/arthurbergmz).

---

### License

Licensed under [MIT](https://github.com/arthurbergmz/version-notifier/blob/master/LICENSE).

---

> _**Disclaimer:** `version-notifier` is an experiment to improve development environments and it is still in alpha. Methods and behavior can change along the way._