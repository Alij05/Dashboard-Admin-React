import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { products } from '../../datas'
import { Link } from 'react-router'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

import './Products.css'

export default function Products() {

  const [productsData, setProductsData] = useState(products)

  const productDelete = (productID) => {
    setProductsData(productsData.filter(product => product.id != productID))
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90
    },
    {
      field: 'title',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        return (
          <Link to={`/product/${params.row.id}`} className="link">
            <div className='userListUser'>
              <img src={params.row.avatar} className="userListImg" />
              {params.row.title}
            </div>
          </Link>
        )
      }
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 120
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Link to={`/product/${params.row.id}`} className="link">
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutlineIcon className="userListDelete" onClick={() => productDelete(params.row.id)} />
          </div>
        )
      }
    }
  ]

  return (
    <div className='userList'>
      <DataGrid
        rows={productsData}
        columns={columns}
        disableSelectionOnClick
        pageSize={3}
        checkboxSelection
      />
    </div>
  );
}
