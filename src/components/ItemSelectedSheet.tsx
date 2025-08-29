import { Item } from "@/interfaces/Item";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription
  } from "@/components/ui/sheet"

interface Props {
  item: Item | null;
  setSelectedItem: (param: Item | null) => void;
  addItem: () => void;
}

export const ItemSelectedSheet = ({ item, setSelectedItem, addItem }: Props) => {

  return (
    <Sheet open={!!item} onOpenChange={() => setSelectedItem(null)}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
            {item?.imageUrl && <div className="-mt-1">
            <img
                src={item?.imageUrl}
                alt={item?.name}
                className="w-full h-[40vh] object-cover rounded-lg b-0"
            />
            </div>}
            <SheetHeader>
            <SheetTitle>{item?.name}</SheetTitle>
            <SheetDescription>
                {item?.description}
            </SheetDescription>
            </SheetHeader>
            <div className="fixed bottom-0 p-4 w-full">
            <p className="mt-2 font-bold text-lg">${item?.price}</p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
            onClick={(e) => {
                e.stopPropagation();
                console.log(item?._id);
                addItem();
            }}>
                Agregar al carrito
            </button>
            </div>
        </SheetContent>
    </Sheet>
  );
};
