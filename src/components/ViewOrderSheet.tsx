import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useCart } from "@/context/CartContext";
import { CartItem } from "@/interfaces/CartItem";
import { Subcategory } from "@/interfaces/Subcategory";
import { useState } from "react";

interface Props {
    order: boolean
    setSelectedOrder: (param: boolean) => void
    subcategories: Subcategory[]
}

export const ViewOrderSheet = ({ order, setSelectedOrder, subcategories }: Props) => {

    const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)

    const { cart, removeFromCart, handleDecrease, handleIncrease } = useCart();
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);

    const onDecrease = (cartItem: CartItem) => {
        if (cartItem.count == 0) {
            return
        } else if (cartItem.count > 1) {
            handleDecrease(cartItem._id)
            for (const subcategory of subcategories) {
                const item = subcategory.items.find(item => item._id === cartItem._id);

                if (item) {
                    item.count = (item.count || 0) - 1;
                    return;
                }
            }
        } else {
            setProductToDelete(cartItem._id);
            setOpenConfirmDeleteModal(true);
        }
    };

    const onIncrease = (id: string) => {
        handleIncrease(id);
        for (const subcategory of subcategories) {
            const item = subcategory.items.find(item => item._id === id);

            if (item) {
                item.count = (item.count || 0) + 1;
                return;
            }
        }
    }

    const handleRemove = (id: string) => {
        setProductToDelete(id);
        setOpenConfirmDeleteModal(true);
    }

    const confirmRemove = () => {
        removeFromCart(String(productToDelete))
        setOpenConfirmDeleteModal(false);
        setProductToDelete(null);
        for (const subcategory of subcategories) {
          const item = subcategory.items.find(item => item._id === productToDelete);
    
          if (item) {
            item.count = 0;
            return;
          }
        }
    }

    const handleConfirmOrder = () => {
        setLoading(true)
        // Simula llamada al backend
        setTimeout(() => {
            setLoading(false)
    
            // Mostrar mensaje de éxito
            toast("Orden generada!", {
                description: "Tu orden fue recibida por el restaurante.",
            })
    
            // Redirigir al checkout después de 2 segundos
            setTimeout(() => {
                window.location.href = "/payment"
            }, 2000)
        }, 1500)
    }

    return (
        <>
            <Sheet open={!!order} onOpenChange={() => setSelectedOrder(false)}>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
                    <SheetHeader className="p-5">
                        <SheetTitle>
                            Confirmación de orden
                        </SheetTitle>
                        <hr className="my-3" />
                        <ul>
                            {cart.map((item) => (
                                <li
                                    key={item._id}
                                    className="flex items-center justify-between border-b border-gray-200 py-2"
                                >
                                    {/* Texto del producto */}
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {item.name} x{item.count}
                                        </p>
                                        <p className="text-sm text-gray-500">${item.price * item.count}</p>
                                    </div>

                                    {/* Acciones */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => onDecrease(item)}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <span className="text-gray-600">−</span>
                                        </button>

                                        <input
                                            type="number"
                                            min={1}
                                            value={item.count}
                                            readOnly
                                            className="w-12 text-center border border-gray-300 rounded"
                                        />

                                        <button
                                            onClick={() => onIncrease(item._id)}
                                            className="p-1 rounded hover:bg-gray-100"
                                        >
                                            <span className="text-gray-600">+</span>
                                        </button>

                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="p-2 rounded hover:bg-red-100"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5 text-[#2C3E50]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-lg font-semibold my-4">Total: ${totalPrice}</h2>
                    </SheetHeader>
                    <div className="fixed bottom-0 p-5 w-full">
                        <button
                            onClick={handleConfirmOrder}
                            disabled={loading}
                            className="mt-4 w-full bg-black text-white py-2 rounded-xl"
                        >
                            {loading ? 'Procesando...' : 'Confirmar orden'}
                        </button>
                    </div>
                </SheetContent>
            </Sheet>

            <Dialog
            open={openConfirmDeleteModal}
            onOpenChange={() => setOpenConfirmDeleteModal(false)}
            >
                <DialogContent>
                    <DialogTitle>Eliminar producto</DialogTitle>
                    <DialogDescription>
                        Estas seguro?
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={() => setOpenConfirmDeleteModal(false)}>Cancelar</Button>
                        <Button onClick={confirmRemove} color="error">
                            Eliminar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

