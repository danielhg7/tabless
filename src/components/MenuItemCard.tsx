import { Item } from "@/interfaces/Item";
//import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";

interface Props {
  item: Item;
}

export const ItemCard = ({ item }: Props) => {
  //const { addToCart } = useCart();

  console.log("Item: ", item)

  return (
    <div
      className='flex items-center border-b border-gray-700 w-full min-w-[398px] min-h-[129px] pb-[1vw] cursor-pointer'
      onClick={() => {
        console.log("Item clickeado");
      }}
    >
      {/* Texto del producto */}
      <div className="flex flex-col justify-between flex-grow h-full w-3/5 pr-2">
        <h3 className="text-base font-medium">{item.name}</h3>
        <p
          className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-2 mt-2"
        >
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-base font-medium">
            ${item.price.toLocaleString()}
          </span>

          {/* Botón agregar al carrito */}
          {/* 
          <button
            className="bg-black text-white font-bold px-3 py-1 rounded hover:bg-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              console.log(item.id);
              addToCart(item);
            }}
          >
            +
          </button> 
          */}
        </div>
      </div>

      {/* Imagen del producto */}
      {item.imageUrl && (
        <div className="flex flex-col justify-between flex-grow h-full items-end">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-[26vw] h-[26vw] object-cover rounded-lg brightness-120"
          />

          {/* Botón flotante */}
          <button id={item._id} className="absolute bg-black text-white rounded-full p-2 shadow-lg transition m-1">
            <Plus size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
