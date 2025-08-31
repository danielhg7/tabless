import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
  } from "@/components/ui/sheet"
import { useState } from "react";
import { SplitBillSheet } from "./SplitBillSheet";

interface Props {
  clickPay: boolean;
  setClickPay: (value: boolean) => void;
}

export const PaySplitBillSheet = ({clickPay, setClickPay}: Props) => {

    const [clickSplit, setClickSplit] = useState(false);
    // const [clickFullBill, setClickFullBill] = useState(false);
  
    const handleOpenSplitBill = () => {
        setClickSplit(true)
    }

    return (
        <>
            <Sheet open={!!clickPay} onOpenChange={() => setClickPay(false)}>
                <SheetContent side="bottom" className="h-[25vh] rounded-t-2xl">
                    <SheetHeader>
                    <SheetTitle>{'Pago de cuenta'}</SheetTitle>
                    </SheetHeader>
                    <div className="fixed bottom-0 py-12 px-5 w-full">
                        <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleOpenSplitBill()
                        }}>
                            Dividir la cuenta
                        </button>
                        <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
                        onClick={(e) => {
                            e.stopPropagation();
                            console.log('Click full bill');
                        }}>
                            Pagar la cuenta completa
                        </button>
                    </div>
                </SheetContent>
            </Sheet>

            <SplitBillSheet clickSplit={clickSplit} setClickSplit={setClickSplit}/>
        </>
    );
};
