import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
  } from "@/components/ui/sheet"

interface Props {
  clickSplit: boolean;
  setClickSplit: (value: boolean) => void;
}

export const SplitBillSheet = ({clickSplit, setClickSplit}: Props) => {
  
    const handleOpenSplitBill = () => {
        
    }

    return (
        <Sheet open={!!clickSplit} onOpenChange={() => setClickSplit(false)}>
            <SheetContent side="bottom" className="h-[34vh] rounded-t-2xl">
                <SheetHeader>
                <SheetTitle>{'Divide la cuenta'}</SheetTitle>
                </SheetHeader>
                <div className="fixed bottom-0 py-12 px-5 w-full">
                    <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSplitBill()
                    }}>
                        Pagar por tus items
                    </button>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('Click full bill');
                    }}>
                        Dividir la cuenta en partes iguales
                    </button>
                    <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
                    onClick={(e) => {
                        e.stopPropagation();
                        console.log('Click full bill');
                    }}>
                        Pagar otro monto
                    </button>
                </div>
            </SheetContent>
        </Sheet>
    );
};
