import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            {/* <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground"> */}
            {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
            <div className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/70 shadow-sm">
                <AppLogoIcon
                    className="h-5 w-5 text-[var(--foreground)] dark:text-white"
                    strokeWidth={2.5}
                />
            </div>
            {/* </div> */}
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    InfinityX
                </span>
            </div>
        </>
    );
}
