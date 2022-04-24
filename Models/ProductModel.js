import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: [String], required: true },
    price: { type: Number, required: true , default: 0},
    rating: { type: Number, required: true, default: 0 },
    brand: { type: String, required: true },
    reviews: [reviewSchema],
    numReview: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    class: { type: String, required: true },
    isFeatured: { type: Boolean, required: true , default: false },
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

export default Product
