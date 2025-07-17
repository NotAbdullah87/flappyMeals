import React from 'react';
import { Container, Typography, Grid, Avatar, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const developers = [
  {
    name: 'Rao Riyan',
    github: 'https://github.com/Riyan-20',
    linkedin: 'https://www.linkedin.com/in/rao-riyan-b886b1242',
    whatsapp: 'https://wa.me/+923095802364',
    avatar: 'https://i.ibb.co/x1qBphR/rao.jpg'
  },
  {
    name: 'Abdullah Shakir',
    github: 'https://github.com/NotAbdullah87',
    linkedin: 'https://pk.linkedin.com/in/abdullah-shakir-107583217',
    whatsapp: 'https://wa.me/+923341863542',
    avatar: 'https://i.ibb.co/BZ5hXj2/me.jpg'
  },
  {
    name: 'Talha Tahir',
    github: 'https://github.com/talhatahir5270',
    linkedin: 'https://www.linkedin.com/in/talha-tahir-a1056830b/',
    whatsapp: 'https://wa.me/+923224877133',
    avatar: 'https://avatars.githubusercontent.com/u/209371262?v=4'
  }
];

const DeveloperCard = ({ developer }) => (
  <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
    <div style={{ textAlign: 'center' }}>
      <Avatar alt={developer.name} src={developer.avatar} sx={{ width: 150, height: 150, margin: '0 auto' }} />
      <Typography variant="h6" sx={{ fontFamily: "Josefin Sans", fontWeight: 600, mt: 2 }} gutterBottom>
        {developer.name}
      </Typography>
      <Grid container justifyContent="center">
        <Link href={developer.github} target="_blank" rel="noopener noreferrer">
          <IconButton><GitHubIcon /></IconButton>
        </Link>
        <Link href={developer.linkedin} target="_blank" rel="noopener noreferrer">
          <IconButton><LinkedInIcon /></IconButton>
        </Link>
        <Link href={developer.whatsapp} target="_blank" rel="noopener noreferrer">
          <IconButton><WhatsAppIcon /></IconButton>
        </Link>
      </Grid>
    </div>
  </Grid>
);

const DeveloperSection = () => {
  return (
    <Container>
      <Typography sx={{ color: "#D91919", fontFamily: "Josefin Sans", fontWeight: 700 }} variant="h4" align="center" gutterBottom>
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
