import { Drawer } from "vaul";

export function NavigationDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger>
        <button
          type="button"
          className="rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Open Drawer
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] h-full mt-24 max-h-[96%] fixed bottom-0 left-0 right-0">
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-gray-300 mb-8" />
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-4">Drawer for React.</Drawer.Title>
              <p className="text-gray-600 mb-2">
                This component can be used as a Dialog replacement on mobile and tablet devices. You
                can read about why and how it was built{" "}
                <a
                  target="_blank"
                  className="underline"
                  href="https://emilkowal.ski/ui/building-a-drawer-component"
                  rel="noreferrer"
                >
                  here
                </a>
                .
              </p>
              <p className="text-gray-600 mb-2">
                It comes unstyled, has gesture-driven animations, and is made by{" "}
                <a
                  href="https://emilkowal.ski/"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Emil Kowalski
                </a>
                .
              </p>
              <p className="text-gray-600 mb-8">
                It uses{" "}
                <a
                  href="https://www.radix-ui.com/docs/primitives/components/dialog"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Radix's Dialog primitive
                </a>{" "}
                under the hood and is inspired by{" "}
                <a
                  href="https://twitter.com/devongovett/status/1674470185783402496"
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  this tweet.
                </a>
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="flex gap-6 justify-end max-w-md mx-auto">Content</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
