import React from 'react';
import { Container, Typography, Grid, Avatar, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
// import Rao from './rao.jpg';
const developers = [
  {
    name: 'Rao Riyan',
    github: 'https://github.com/Riyan-20',
    linkedin: 'https://www.linkedin.com/in/rao-riyan-b886b1242',
    whatsapp: 'https://wa.me/+923095802364',
    avatar: 'https://i.ibb.co/x1qBphR/rao.jpg' // Replace with actual image URL
  },
  {
    name: 'Abdullah Shakir',
    github: 'https://github.com/NotAbdullah87',
    linkedin: 'https://pk.linkedin.com/in/abdullah-shakir-107583217',
    whatsapp: 'https://wa.me/+923341863542',
    avatar: 'https://i.ibb.co/BZ5hXj2/me.jpg' // Replace with actual image URL
  }
];

const DeveloperCard = ({ developer }) => (
  <Grid item xs={12} sm={6} md={4}>
    <Avatar alt={developer.name} src={developer.avatar} sx={{ width: 150, height: 150, margin: '0 auto' }} />
    <Typography variant="h6" sx={{fontFamily:"Josefin Sans",fontWeight:600}} align="center" gutterBottom>
      {developer.name}
    </Typography>
    <Grid container justifyContent="center">
      <Link href={developer.github} target="_blank">
        <IconButton>
          <GitHubIcon />
        </IconButton>
      </Link>
      <Link href={developer.linkedin} target="_blank">
        <IconButton>
          <LinkedInIcon />
        </IconButton>
      </Link>
      <Link href={developer.whatsapp} target="_blank">
        <IconButton>
          <WhatsAppIcon />
        </IconButton>
      </Link>
    </Grid>
  </Grid>
);

const DeveloperSection = () => {
  return (
    <Container>
      <Typography sx={{color:"#D91919",fontFamily:"Josefin Sans"}} variant="h4" align="center" gutterBottom>
        Our Creative Developers
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {developers.map((developer, index) => (
          <DeveloperCard key={index} developer={developer} />
        ))}
      </Grid>
    </Container>
  );
};

export default DeveloperSection;
