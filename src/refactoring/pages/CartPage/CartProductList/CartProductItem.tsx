import { getMaxDiscount } from "@/refactoring/models";
import { useCartContext } from "@/refactoring/provider";
import { Product } from "@/types";
import { ReactNode } from "react";

type Props = {
  product: Product;
  children: ReactNode;
};

export const CartProductItem = ({ product, children }: Props) => {
  const { addToCart, getRemainingStock } = useCartContext();
  const remainingStock = getRemainingStock(product);

  return (
    <div data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <span className={`font-medium ${remainingStock > 0 ? "text-green-600" : "text-red-600"}`}>
          재고: {remainingStock}개
        </span>
        {product.discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">
            최대 {(getMaxDiscount(product.discounts) * 100).toFixed(0)}% 할인
          </span>
        )}
      </div>
      {children}
      <button
        onClick={() => addToCart(product)}
        className={`w-full px-3 py-1 rounded ${remainingStock > 0 ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? "장바구니에 추가" : "품절"}
      </button>
    </div>
  );
};

export default CartProductItem;
