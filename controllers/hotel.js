
import Booking from "../models/Booking.js";
import City from "../models/City.js";
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json({ savedHotel, message: 'Hotel added ' })
    } catch (err) {
        next(err)
    }
}


export const updateHotel = async (req, res, next) => {

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.body._id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

//delete hotel
export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("hotel has been delected")
    } catch (err) {
        next(err)
    }
}

//get 
export const getHotel = async (req, res, next) => {

    try {
        const hotel = await Hotel.findOne({ _id: req.params.id }).populate("rooms.roomId").populate('review.userId',"username")

        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

//get all hotels buy city for search
export const getHotelsSearch = async (req, res, next) => {
    const { city } = req.query  //eth prashnam vannal veanam
    // console.log(req.query,"it is hamras body")
    // console.log(min,"it is min")
    // console.log(max,"it is max")
    // console.log(others,"it is other")

    try {
        // const hotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 15000 } }).limit(req.query.limit)
        const hotels = await Hotel.find({ city: city }).limit(4)  //eth prashnam vannal veanam

        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

//get all hotel
export const getHotels = async (req, res, next) => {
    try {
        const hotels = await Hotel.find().limit(4)  //eth prashnam vannal veanam
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

//get all hotle in admin side (disply)
export const getHotelsAdmin = async (req, res, next) => {

    try {
        const hotels = await Hotel.find()

        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
}

export const countByCity = async (req, res, next) => {
    // const cities = req.query.cities.split(",")
    try {
        // const list = await Promise.all(cities.map(city => {
        //     return Hotel.countDocuments({ city: city })
        // }))

        const list = await City.find()

        res.status(200).json(list)
    } catch (err) {
        next(err)
    }
}

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotels" })
        const apartmentCount = await Hotel.countDocuments({ type: "Apartments" })
        const resortCount = await Hotel.countDocuments({ type: "Resorts" })
        const villaCount = await Hotel.countDocuments({ type: "villa" })
        const cabinCount = await Hotel.countDocuments({ type: "cabin" })

        // const list= await Promise.all(cities.map(city=>{
        //     return Hotel.countDocuments({city:city}) 
        // }))

        res.status(200).json([
            { type: 'Hotels', count: hotelCount },
            { type: 'Apartments', count: apartmentCount },
            { type: 'Resorts', count: resortCount },
            { type: 'Rillas', count: villaCount },
            { type: 'Cabins', count: cabinCount },
        ])
    } catch (err) {
        next(err)
    }
}

//room

export const getHotelRooms = async (req, res, next) => {
    try {

        const hotel = await Hotel.findOne({ _id: req.params.id }).populate("rooms.roomId").populate('review.userId',"username")

        // const list = await Promise.all(
        //     hotel.rooms.map((room) => {
        //         return Room.findById(room)
        //     })
        // )
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

//check user booked this hotel or not
export const checkHotel = async (req, res, next) => {
    try {
        console.log(req.body,"it is req.body")

        const {userId, hotelId } = req.body
        const date = new Date();
        console.log(date);
        const findHotel = await Booking.findOne({userId:userId, hotelId:hotelId })
        console.log(findHotel,"findHotel")
        if(findHotel ){
            if(date>findHotel.checkOut){

                res.status(200).json({status:true})
            }else{
                res.status(200).json({status:false,message:"review can add only after checkOut!"})

            }
        }else{
            res.status(200).json({status:false,message:"review can add only after order!"})
        }
    } catch (err) {
        next(err)
    }

}

//add review
export const reviewdata = async (req, res, next) => {
    try {
     
        const { hotelId, userId, review } = req.body
        const findHotelId = await Booking.findOne({ hotelId: hotelId })
        if (findHotelId) {
            const findHotel = await Hotel.findByIdAndUpdate(hotelId,
                {
                    $push: {
                        review: { userId: userId, comment: review }
                    }
                }
            )
        }
        if (findHotelId) {

        }
        res.status(200).json({ status: true })
    } catch (err) {
        next(err)
    }
}


export const addCity = async (req, res, next) => {
    // const {name} = req.body
    const newCity = new City(req.body);
    try {
        const city = await City.findOne({ name: req.body.name })
        if (city) {
            return res.json({ status: false, message: 'city already exist' })
        }

        const savedCity = await newCity.save()
        res.status(200).json({ savedCity, status: false, message: 'City added ' })

    } catch (err) {
        next(err)
    }
}

export const getCity = async (req, res, next) => {
    try {
        const city = await City.find()
        res.status(200).json({ city, message: "city List" })

    } catch (err) {
        next(err)
    }
}

export const getType = async (req, res, next) => {
    try {
        const type = await Hotel.find({ type: req.params.searchType })
        res.status(200).json({ type, message: "city List" })

    } catch (err) {
        next(err)
    }
}