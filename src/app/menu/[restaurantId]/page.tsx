"use client";

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation";
import { Typography, Grid, CircularProgress, Container } from "@mui/material"
import { ItemCard } from "@/components/MenuItemCard"
import { Item } from "@/interfaces/Item"
// import { useRouter } from 'next/navigation'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { useCart } from "@/context/CartContext"
import { CategoryDocument } from "@/models/Category"
import { Subcategory } from "@/interfaces/Subcategory"
import { Tabs, Tab, Box } from '@mui/material'
import React from "react"
import { useRestaurant } from "@/context/RestaurantContext"
import { ShoppingCartIcon } from "lucide-react"
import { CartItem } from "@/interfaces/CartItem"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog";

export default function MenuPage() {
  const { restaurantId } = useParams();
  const {setRestaurant} = useRestaurant();
  const [categories, setCategories] = useState<CategoryDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryDocument|null>(null);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [menu, setMenu] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  // const router = useRouter();

  const { cart, removeFromCart, handleDecrease, handleIncrease, addToCart } = useCart();
  const sectionRefs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({});
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const totalItems = cart.reduce((acc, item) => acc + item.count, 0);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const res = await fetch(`/api/restaurants/menu?slug=${restaurantId}`);
        const data = await res.json();
        if (res.ok) {
          setRestaurant(data.restaurant)
          if(data.categories) {
            setCategories(data.categories);
            setSelectedCategory(data.categories[0])
            setSubcategories(data.categories[0].subcategories)
          } 
        } else {
          console.error(data.error);
          setMenu([]);
          setCategories([]);
          setRestaurant(null);
        }
      } catch (error) {
        console.error("Error fetching menu", error);
        setMenu([]);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, [restaurantId, setRestaurant]);

  if (loading) {
    return (
      <Container sx={{ textAlign: "center", mt: 10 }}>
        <CircularProgress />
      </Container>
    );
  }

  if ((!categories || categories.length === 0) && (!menu || menu.length === 0)) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4">Menú no disponible 😢</Typography>
      </Container>
    );
  }

  const handleTabClick = (subcategoryName: string) => {
    const ref = sectionRefs.current[subcategoryName];
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeeOrder = () => {
    setSelectedOrder(true)
  }

/*   const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value;
    const category = categories.find((c) => c.id === selectedId);
    if (category) {
      setSelectedCategory(category);
    }
  } */

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  };

  const addItem = () => {
    if(selectedItem != null && selectedItem.count !== null) {
      selectedItem.count++;
      console.log("SelectedItem: ", selectedItem)
      addToCart(selectedItem)
      setSelectedItem(null);
      console.log(cart);
    }
  }

  const onDecrease = (cartItem: CartItem) => {
    if(cartItem.count == 0) {
      return
    } else if(cartItem.count > 1) {
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
      setOpenConfirmModal(true);
    }
  };

  const onIncrease = (id: string) => {
    handleIncrease(id)
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
    setOpenConfirmModal(true);
  }

  const confirmRemove = () => {
    removeFromCart(String(productToDelete))
    setOpenConfirmModal(false);
    setProductToDelete(null);
    for (const subcategory of subcategories) {
      const item = subcategory.items.find(item => item._id === productToDelete);
      
      if (item) {
        item.count = 0;
        return;
      }
    }
  }

  return (
    <>
        <Container sx={{ py: 6, px: 3, width: '100%', maxWidth: '430px' }}>
          {/*<Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            size="small"
            sx={{ minWidth: 150, ml: 2 }}
            renderValue={(selected) => selected?.name || ''}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>*/}
          <Grid container spacing={2}>
            <Box sx={{ borderColor: 'divider' }}>
              <Tabs
                value={selectedTab}
                variant="scrollable"
                onChange={handleTabChange}
                scrollButtons="auto"
              >
                {subcategories.map((subcategory) => (
                  subcategory?.items?.length > 0 && (
                    <Tab key={subcategory.id} label={subcategory.name} onClick={() => handleTabClick(subcategory.name)}/>
                  )
                ))}
              </Tabs>
            </Box>
          </Grid>

          {/* Items */}
          <Grid container spacing={2}>
            {subcategories.map((subcategory) => {
              if (!subcategory.items || subcategory?.items?.length === 0) return null;

              if (!sectionRefs.current[subcategory.name]) {
                sectionRefs.current[subcategory.name] = React.createRef<HTMLDivElement>();
              }
              
              return (
                <Box sx={{ xs: 12, sm: 6, md: 4, my: 2 }} key={subcategory.id} ref={sectionRefs.current[subcategory.name]}>
                  
                  {selectedCategory && subcategory?.items?.length > 0 && 
                  
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: "500" }}>
                    {subcategory.name}
                  </Typography>}

                  <Grid container spacing={2}>
                    {subcategory?.items?.map((item) => (
                      <Grid size={{ xs: 12,sm: 6, md: 3 }} key={item._id} onClick={() => setSelectedItem(item)}>
                        <ItemCard item={item} />
                      </Grid>
                    ))}
                  </Grid>
                  
                </Box>
              )})}
          </Grid>

          <Sheet open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
              <div className="-mt-1">
                <img
                  src={selectedItem?.imageUrl}
                  alt={selectedItem?.name}
                  className="w-full h-[40vh] object-cover rounded-lg b-0"
                />
              </div>
              <SheetHeader>
                <SheetTitle>{selectedItem?.name}</SheetTitle>
                <SheetDescription>
                  {selectedItem?.description}
                </SheetDescription>
              </SheetHeader>
              <div className="fixed bottom-0 p-4 w-full">
                <p className="mt-2 font-bold text-lg">${selectedItem?.price}</p>
                <button className="mt-4 w-full bg-black text-white py-2 rounded-xl" 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(selectedItem?._id);
                  addItem();
                }}>
                  Agregar al carrito
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={!!selectedOrder} onOpenChange={() => setSelectedOrder(false)}>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-2xl">
              <SheetHeader className="p-5">
                <SheetTitle>
                  <h2>Confirmación de orden</h2>
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
                  onClick={() => console.log('Pedido confirmado!')}
                  className="mt-4 w-full bg-black text-white py-2 rounded-xl"
                >
                  Confirmar orden
                </button>
              </div>
            </SheetContent>
          </Sheet>

          <Dialog
            open={openConfirmModal}
            onOpenChange={() => setOpenConfirmModal(false)}
          >
            <DialogContent>
              <DialogTitle>Eliminar producto</DialogTitle>
              <DialogDescription>
                Estas seguro?
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setOpenConfirmModal(false)}>Cancel</Button>
                <Button onClick={confirmRemove} color="error">
                  Remove
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>


          {totalItems > 0 && (
            <Button
              onClick={handleSeeOrder}
              className="
              fixed
              bottom-[20px]
              left-1/2
              -translate-x-1/2
              -translate-y-[52px]
              rounded-[10px]
              shadow-lg
              bg-black
              hover:bg-[#3b5670]
              px-2
              text-white
              py-2
              font-medium
              flex
              items-center
              space-x-2"
            >
                <ShoppingCartIcon className='shoppingCartIcon' />
                Ver pedido ({totalItems})
            </Button>
          )}
        </Container>
    </>
  );
}