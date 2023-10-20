import { CartContext, CartProduct } from "@/providers/cart";
import Image from "next/image";
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  product: CartProduct;
}

const CartItem = ({ product }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantityClick = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantityClick = () => {
    increaseProductQuantity(product.id);
  };

  const handleremoveProductFromCartClick = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* PARTE DIREITA FOTO E NOME */}

        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            alt={product.name}
            height={0}
            width={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[70%]"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">
              R$ {product.totalPrice.toFixed(2).replace(".", ",")}
            </p>

            {product.discountPercentage > 0 && (
              <p className="text-sm line-through opacity-75">
                R$ {Number(product.basePrice).toFixed(2).replace(".", ",")}
              </p>
            )}
          </div>
          <div className="mt-1 flex items-center gap-1">
            <Button size="icon" variant="outline" className="h-8 w-8">
              <ArrowLeftIcon
                size={12}
                onClick={handleDecreaseProductQuantityClick}
              />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button size="icon" variant="outline" className="h-8 w-8">
              <ArrowRightIcon
                size={12}
                onClick={handleIncreaseProductQuantityClick}
              />
            </Button>
          </div>
        </div>
      </div>

      <div>
        <Button
          size="icon"
          variant="outline"
          onClick={handleremoveProductFromCartClick}
        >
          <TrashIcon size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
