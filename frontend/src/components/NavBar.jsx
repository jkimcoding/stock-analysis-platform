import { Disclosure } from '@headlessui/react';

const navigation = [
    { name: 'Main', key: 'main' },
    { name: 'Platform Description', key: 'platformDescription' },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

const NavBar = ({ currentTab, setCurrentTab }) => {

    console.log("C: ", currentTab)
    return (
        <>
            <Disclosure as="nav">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 text-gray-900">JONATHAN CODES</div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {navigation.map((item) => (
                                        <button
                                            key={item.key}
                                            onClick={() => setCurrentTab(item.key)}
                                            className={classNames(
                                                currentTab === item.key
                                                    ? 'bg-gray text-white'
                                                    : 'text-gray-900 hover:bg-gray hover:text-gray-950',
                                                'rounded-md px-3 py-2 text-sm font-medium'
                                            )}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Disclosure>
        </>
    );
};


export default NavBar;