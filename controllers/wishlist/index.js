import { User } from "../../models/user.js";
import { Wishlist } from "../../models/wishlist.js";


export const postWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    console.log("product Id:", productId);

    const userId = req.user.id;

    let wishlist = await Wishlist.findOne({ user: userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
    } else if (
      wishlist.products.some(
        (id) => id.toString() === productId.toString()
      )
    ) {
      return res.status(409).json({
        message: "Product already in wishlist",
        success: false,
      });
    } else {
      wishlist.products.push(productId);
    }

    await wishlist.save();

    return res.status(201).json({
      message: "Product added to wishlist",
      success: true,
    });

  } catch (error) {
    console.log("Wishlist Error:", error);

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


export const getWhislist= async (req,res)=>{
    try{
    const userId = req.user.id

    const wishlist = await Wishlist.find({user:userId}).populate("products");
    res.status(201).json({
        message:"list fetch successfully",
        success:true,
        data:wishlist
    })

}catch(error){
    console.log(error);
    res.status(500).json({
    message:"Internal server error",
    success: false
    });
}
};