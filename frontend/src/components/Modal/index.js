import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Loader from '../Loader'

export default function Modal({ action, title, Element, btnConfig, onClose=null }) {
  let [isOpen, setIsOpen] = useState(false);
  let [isLoader, setIsLoader] = useState(false);

  function closeModal() {
    if (onClose !== null) onClose();
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  function closeLoader() {
    setIsLoader(false);
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="rounded-md bg-lightText md:mx-8 px-4 py-2 text-sm font-medium text-white hover:bg-gray-500 hover:text-primaryColorLight"
      >
        {action}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            
          >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-[5px]" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-h-[600px] max-w-3xl transform overflow-auto rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold pb-6 leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>

                  {/* All Child content present inside Element component*/}
                  {Element}
                  {/* End */}

                  <div className="mt-4 space-x-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    {
                      btnConfig.map((item, index) => {
                        return <button
                          key={index}
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                          onClick={() => {
                            setIsLoader(true);
                            item.handler(closeLoader);
                          }}
                        >
                          {item.title} {isLoader ? <Loader/> : ""}
                        </button>
                      })
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
