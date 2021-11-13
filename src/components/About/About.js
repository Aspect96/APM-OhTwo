import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import './About.css'

const About = () => (
  <Box sx={{ my:2 }}> 
    <Typography variant="h2" component="div" className="About-project-name" sx={{ mb:2 }}>OhTwo - 0 Waste 2 Life</Typography>
    <Typography variant="body1" component="div" className="About-story" sx={{ mb:10 }}>
      In the fight against waste and in order to help find sustainability, 0 Waste 2 Life’s mission consists in giving items a second life.
      <br /><br />
      We are consuming our planet’s resources at an exponential rate and throwing items that are in good condition away just because we don’t need it anymore.
      It is not because we don’t want it that somebody else doesn’t want it. 
      What if we give the item a second life? Give it a second chance? What if instead of throwing it in the bin we give it out to another person that needs it?
      This is what this O2 is about. 
      We want you to share your items that are still usable and consumable with other people and give it a chance to live its life to the fullest!
      <br /><br />
      If you have electronics, clothes, food, furniture, any home appliances or other things that are still in good shape or/and consumable, we want you to share it in here!
      <br /><br />
      We are all part of this world, we are all responsible to keep our planet green, we want to feel fresh air every time we breathe, we want O2!
    </Typography>

    <div align="center">
      <Typography variant="body1" component="div">
      This is an application developed for the University of Luxembourg course:<br />
      MICS-COMMSYST-027: Advanced Project Management<br />
      It was developed by a group of 4 members:<br />
      <ul>
        <li>Damian Tabaczyński</li>
        <li>Dany Gonçalves</li>
        <li>Jerome Bortuzzo</li>
        <li>Vinicius Amaro Cechin</li>
      </ul>
      </Typography>
    </div>
  </Box>
)

export default About;
