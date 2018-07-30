// Type definitions for version-notifier 0.0.1
// Project: https://github.com/arthurbergmz/version-notifier
// Definitions by: Arthur A. Bergamaschi <arthurbergmz@gmail.com>

declare namespace VersionNotifier {
    type ProviderLog = (err?: Error | null, message?: string) => void;
    type ProviderFunction = (packageName: string, currentVersion: string, log: ProviderLog) => void;
    type ProviderDependencyChecker = (parentDependenciesJsonObject: any, dependencyName: string) => boolean;
    interface ProviderObject {
        isDependency?: ProviderDependencyChecker;
        resolver: ProviderFunction;
    }
}

declare function verifyVersion (
    appRootDirectory: string,
    customProvider?: VersionNotifier.ProviderFunction | VersionNotifier.ProviderObject,
    log?: VersionNotifier.ProviderLog
): void;

export = verifyVersion;