import { useState } from "react";

function Accordion({ children }) {
    const [accordionOpen, setAccordionOpen] = useState(false);

    return (
        <div className="py-2">
            <button onClick={() => setAccordionOpen(!accordionOpen)} className="flex justify-between w-full rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 mt-8">
                <span className="text-xl text-green-700">
                    See Care Plan
                </span>
                <svg
                    className="fill-green-500 shrink-0 ml-8 mt-1"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                            }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                            }`}
                    />
                </svg>

            </button>
            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
                }`} >
                <div className="overflow-hidden">{children}</div>
            </div>
        </div>
    )
}

export default Accordion;