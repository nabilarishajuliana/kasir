import React, { createContext, useContext, useState } from "react";
import { IMenu } from "../types/menu-types";

type CoffeeCartProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  menuId: number;
  harga: number;
  jumlah: number;
};

type CoffeeCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (menu: IMenu) => void;
  decreaseCartQuantity: (menu: IMenu) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  clearCartItems: () => void;
  
};

const CoffeeCartContext = createContext({} as CoffeeCartContext);

export function useCoffeeCart() {
  return useContext(CoffeeCartContext);
}

export const CoffeeCartProvider: React.FC<CoffeeCartProviderProps> = ({
  children,
}: CoffeeCartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Contoh inisialisasi

 
  function clearCartItems(): void {
    setCartItems([]); // Mengosongkan cartItems dengan array kosong
  }

  const cartQuantity = cartItems.reduce(
    (jumlah, item) => item.jumlah + jumlah,
    0
  );

  function getItemQuantity(id: number): number {
    return cartItems.find((item) => item.menuId === id)?.jumlah || 0;
  }

  function increaseCartQuantity(menu: IMenu): void {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.menuId === menu.id) == null) {
        return [
          ...currItems,
          { menuId: menu.id, harga: menu.harga, jumlah: 1 },
        ];
      } else {
        return currItems.map((item) => {
          if (item.menuId === menu.id) {
            return { ...item, jumlah: item.jumlah + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(menu: IMenu): void {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.menuId === menu.id)?.jumlah === 1) {
        return currItems.filter((item) => item.menuId !== menu.id);
      } else {
        return currItems.map((item) => {
          if (item.menuId === menu.id) {
            return { ...item, jumlah: item.jumlah - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.menuId !== id);
    });
  }

  return (
    <CoffeeCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        isLoggedIn,
        setIsLoggedIn,
        clearCartItems,
      }}
    >
      {children}
    </CoffeeCartContext.Provider>
  );
};
