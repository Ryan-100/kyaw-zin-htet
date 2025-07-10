
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useTheme } from '../contexts/ThemeContext';
import { Project } from '../types';

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
);


const CartModal: React.FC = () => {
    const { isCartOpen, closeCart, cartItems, removeFromCart } = useCart();
    const { theme } = useTheme();

    if (!isCartOpen) return null;

    const modalBgClass = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 transition-opacity rounded-lg" onClick={closeCart}></div>

            <div className={`relative ${modalBgClass} rounded-lg shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full`}>
                <div className="p-6">
                    <div className="flex items-start justify-between">
                        <h3 className="text-lg font-medium leading-6" id="modal-title">
                            Collected Projects
                        </h3>
                        <button onClick={closeCart} className="p-1 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-50 transition-colors">
                           <CloseIcon className="w-6 h-6"/>
                        </button>
                    </div>
                    <div className="mt-4">
                        {cartItems.length > 0 ? (
                            <ul role="list" className="divide-y divide-slate-200 dark:divide-slate-700 max-h-96 overflow-y-auto pr-2">
                                {cartItems.map((item: Project) => (
                                    <li key={item.id} className="flex py-4">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                                            <img src={item.image} alt={item.title} className="h-full w-full object-cover object-center" />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium">
                                                    <h3>{item.title}</h3>
                                                </div>
                                                <p className="mt-1 text-sm text-slate-500">{item.category}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="flex">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color-hover)] transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-slate-500 py-8">Your cart is empty. Add some projects you're interested in!</p>
                        )}
                    </div>
                </div>
                {cartItems.length > 0 && (
                    <div className={`px-6 py-4 border-t border-slate-200 dark:border-slate-800 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
                        <a 
                            href="mailto:kyawzinhtet.dev@gmail.com"
                            className="w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm"
                            style={{ backgroundColor: 'var(--primary-color)'}}
                        >
                            Contact Me About These Projects
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartModal;
