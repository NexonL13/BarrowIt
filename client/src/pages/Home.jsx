import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { TbPackageOff } from 'react-icons/tb'
import { MdAddCircleOutline } from 'react-icons/md'

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
      <div className="w-full h-screen">
        <table className="table w-full">
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
              <th className="flex justify-center align-middle"><button className="text-3xl" onClick={handleClick}><MdAddCircleOutline className="text-3xl"/></button></th>
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
                      item.status 
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
            {listOfEquipment.length == 0 ?
            <tr>
            <th></th>
            <th></th>
            <th className="text-teal-500"><TbPackageOff className="inline text-lg"/>No Equipment List</th>
            <th></th>
            <th></th>
          </tr>
          :
          <tr>
            <th></th>
            <th>Equipment Name</th>
            <th>Description</th>
            <th>Stocks</th>
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
