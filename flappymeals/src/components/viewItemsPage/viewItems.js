import React from 'react'
import { Products } from '../products/products'
import { Container, Pagination } from '@mui/material'
import UserDashboardHeader from '../userDashboardHeader/userDashboardHeader'
import Footer from '../Footer/footer'
const viewItems = () => {
  return (
    <div>
        <UserDashboardHeader/>
        <Container sx={{mt:10}}> 
        <Products />
        </Container>
        <Footer/>

    </div>
  )
}

export default viewItems