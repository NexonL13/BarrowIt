import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { IoIosAddCircle } from 'react-icons/io'

const Home = () => {
  const [listOfEquipment, setListOfEquipment] = useState([]);
  const url_path = "http://localhost:5173/public/images/"
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllEquipment = async () => {
      const { data } = await axios.get("http://localhost:3000/equipment");
      setListOfEquipment(data);
      console.log(data);
    };
    fetchAllEquipment();
  }, []);

  const handleClick = () => {
    navigate('/add')
  }

  return (
    <>
      <div className="flex justify-center align-middle">
        <table className="table w-1/2">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Equipment Name</th>
              <th>Description</th>
              <th>Stocks</th>
              <th className="flex justify-center align-middle"><button className="text-3xl" onClick={handleClick}><IoIosAddCircle/></button></th>
            </tr>
          </thead>
          {listOfEquipment.map((item) => (
          <tbody key={item.id}>
            {/* row 1 */}
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={`${url_path + item.image}`}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      {
                      item.isAvailable 
                      ? 
                      <div className="text-sm opacity-50 text-green-900 font-bold">
                        Available
                      </div>
                      :
                      <div className="text-sm opacity-50 text-red-900 font-bold">
                      Out of Stock
                      </div>
                      }
                    </div>
                  </div>
                </td>
                <td>
                  {item.description}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.category}
                  </span>
                </td>
                <td>{item.stock}</td>
                <th>
                  <button className="btn btn-ghost btn-xs" onClick={handleClick}>details</button>
                </th>
              </tr>
          </tbody>
          ))}
          {/* foot */} 
          <tfoot>
          {listOfEquipment == 0 ? 
          <tr className="text-2xl absolute mx-auto w-full font-bold text-teal-500 flex align-middle justify-center p-20 border-solid border-teal-500 border-2">
            <svg  className="inline fill-teal-500"xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="35" height="35"
viewBox="0 0 50 50">
<path d="M 24.984375 3.9863281 A 1.0001 1.0001 0 0 0 24.839844 4 L 11 4 A 1.0001 1.0001 0 0 0 10.359375 4.2324219 L 4.3730469 9.2207031 L 4.359375 9.2324219 A 1.0001 1.0001 0 0 0 4.3261719 9.2636719 A 1.0001 1.0001 0 0 0 4.2832031 9.3027344 A 1.0001 1.0001 0 0 0 4 10.152344 L 4 45 A 1.0001 1.0001 0 0 0 5 46 L 45 46 A 1.0001 1.0001 0 0 0 46 45 L 46 10.144531 A 1.0001 1.0001 0 0 0 45.765625 9.3554688 A 1.0001 1.0001 0 0 0 45.761719 9.3496094 A 1.0001 1.0001 0 0 0 45.697266 9.2832031 A 1.0001 1.0001 0 0 0 45.640625 9.2324219 L 45.621094 9.2167969 L 39.640625 4.2324219 A 1.0001 1.0001 0 0 0 39 4 L 25.154297 4 A 1.0001 1.0001 0 0 0 24.984375 3.9863281 z M 11.361328 6 L 24 6 L 24 9 L 7.7617188 9 L 11.361328 6 z M 26 6 L 38.638672 6 L 42.238281 9 L 26 9 L 26 6 z M 6 11 L 24.832031 11 A 1.0001 1.0001 0 0 0 25.158203 11 L 44 11 L 44 44 L 6 44 L 6 11 z M 21.5 15 C 20.116667 15 19 16.116667 19 17.5 C 19 18.883333 20.116667 20 21.5 20 L 28.5 20 C 29.883333 20 31 18.883333 31 17.5 C 31 16.116667 29.883333 15 28.5 15 L 21.5 15 z M 21.5 17 L 28.5 17 C 28.716667 17 29 17.283333 29 17.5 C 29 17.716667 28.716667 18 28.5 18 L 21.5 18 C 21.283333 18 21 17.716667 21 17.5 C 21 17.283333 21.283333 17 21.5 17 z M 31 31 L 28 34 L 30 34 L 30 38 L 32 38 L 32 34 L 34 34 L 31 31 z M 38 31 L 35 34 L 37 34 L 37 38 L 39 38 L 39 34 L 41 34 L 38 31 z M 28 39 L 28 41 L 41 41 L 41 39 L 28 39 z"></path>
</svg>
            No Equipment List</tr>
          :
            <tr>
              <th></th>
              <th>Equipment Name</th>
              <th>Description</th>
              <th>Stock</th>
              <th></th>
            </tr>
          }
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default Home;
