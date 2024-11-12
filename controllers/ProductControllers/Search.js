import Product from '../../Models/Product.js'

const Search = async (req, res) => {
  const { perfume } = req.query;
  
  if (!perfume) {
    return res.status(400).json({ message: 'Perfume name is required' });
  }

  try {
    const products = await Product.find({ 
      title: { $regex: new RegExp(perfume, 'i') } 
    });

    if (products.length === 0) {
      return res.status(404).json({sucess:true , data:[]});
    }

    return res.status(200).json({sucess:true , data:products});
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: 'Server error, please try again later' });
  }
}

export default Search;
