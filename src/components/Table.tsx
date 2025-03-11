import { Popover, RadioGroup, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";
import { uuidGen } from "../utils/formatMethods";

const Table = ({ columns, data, EDIT_OPTIONS=[] }:any) => {

  const [showDescription, setShowDescription] = useState(false);

  return (
    <div className="overflow-x-auto mt-6 bg-white rounded-xl shadow-md">
      <table className="w-full min-w-[300px] text-left">
        <thead>
          <tr className="border-b">
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-6 text-[#7F7F7F] font-medium text-nowrap">
                {col}
              </th>
            ))}
            <th className="py-3 px-6 text-[#7F7F7F] font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <tr 
                  className="border-b"
                  >
                  {Object.values(row).filter(item => item !== row?.description).map((value: any, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="py-4 px-6 text-black font-medium"
                      onClick={() => {
                        showDescription === rowIndex ? setShowDescription(false) : setShowDescription(rowIndex)
                      }}
                    >
                      {typeof value === "object" ? (
                        <span>
                          <span className="text-black font-semibold block">
                            {value?.name}
                          </span>
                          <span className="text-[#7F7F7F] text-sm">
                            {value?.type}
                          </span>
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                  {/* Actions Column */}
                  <td className="py-4 px-6 text-[#7F7F7F] text-xl">
                    <div className="flex-1 flex justify-center">
                        <Popover className="relative">
                          <Popover.Button
                            className={`w-fit text-2xl text-medium border border-solid px-3 py-2 text-center rounded-xl flex flex-row items-center justify-center gap-x-1`}
                          >
                            <FaEllipsisH />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="box-border absolute z-50 -right-6 bg-white mb-2 w-24 lg:w-32 shadow-2xl p-2 lg:p-4 rounded-2xl secondary_gray_color text-black">
                              <div className="w-full">
                                <RadioGroup>
                                  <div className="space-y-3">
                                    {EDIT_OPTIONS?.map((item: any, i) => (
                                      <RadioGroup.Option
                                        key={uuidGen()}
                                        value={item?.label}
                                        className={
                                          "flex items-start cursor-pointer mb-2"
                                        }
                                        onClick={() => {
                                          item?.runFunction(row, Object.values(row)[rowIndex]);
                                        }}
                                      >
                                        {({ active, checked }) => (
                                          <>
                                            <div className="text-sm">
                                              <RadioGroup.Label
                                                as="p"
                                                className={`text-xs lg:text-sm secondary_gray_color text-black capitalize text-nowrap text-start`}
                                              >{item?.label}
                                              </RadioGroup.Label>
                                            </div>
                                          </>
                                        )}
                                      </RadioGroup.Option>
                                    ))}
                                  </div>
                                </RadioGroup>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </Popover>
                      </div>
                  </td>
                </tr>
                {/* Description Row - as a separate row */}
                {showDescription === rowIndex && (
                  <tr>
                    <td
                      colSpan={columns?.length + 1}
                      className="py-0 px-0"
                    >
                      <div className="w-full block bg-[#F9F9F9] rounded-xl p-4 mb-4 flex flex-row items-center justify-start gap-x-5">
                        <p className="text-md text-[#6D6D6D] font_medium">
                          Description: 
                        </p>
                        <p className="text-md text-black font_medium">
                          {row?.description}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          ) : (
            <tr className="border-b">
              <td colSpan={columns?.length} className="text-center py-10 text-2xl font-semibold"> Nothing to see here...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
