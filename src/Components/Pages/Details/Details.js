import React from 'react';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Star, StarBorder } from '@mui/icons-material';
import DisableableBox from '../../../Global/HelperComponents/DisableableBox';
import Condition from '../../../Global/HelperComponents/Condition';
import { useMovieDetails } from './detailsHelpers';

const Details = () => {
  const { movieId } = useParams();
  const { data, isLoading, isFavorite, handleIsFavorite } = useMovieDetails(movieId);

  return (
    <Box height={1} width={1}>
      <Condition condition={data?.Response === 'False'}>
        <Typography sx={{ textAlign: 'center' }} variant='subtitle1'>
          Incorrect IMDb ID
        </Typography>

        <DisableableBox loading={isLoading}>
          <Box width={1} height={1}>
            <Box sx={{ display: 'flex' }}>
              <Box>
                <Typography variant='h4'>
                  {data?.Title} {data?.Year}
                </Typography>
                <Typography variant='subtitle1'>{data?.Country}</Typography>
              </Box>

              <IconButton
                onClick={handleIsFavorite}
                sx={{ ml: 'auto', width: '66px' }}
                aria-label='delete'
              >
                <Condition condition={isFavorite}>
                  <Star sx={{ fontSize: 25 }} />
                  <StarBorder sx={{ fontSize: 25 }} />
                </Condition>
              </IconButton>
            </Box>
            <Divider />

            <Grid container width={1} sx={{ height: 'calc(100% - 85px)', p: 2 }}>
              <Grid item md={6} sm={6} xs={12} height={1}>
                <img style={{ height: '70%', maxWidth: '100%' }} src={data?.Poster} />
                <Typography>{data?.Plot}</Typography>
              </Grid>
              <Grid item md={6} sm={6} xs={12} height={1}>
                <Box sx={{ overflow: 'auto', p: 1 }} height={1}>
                  {Object.keys(data ? data : [])
                    .filter(el => {
                      return !['Title', 'Year', 'Plot', 'Country', 'Poster', 'Ratings'].includes(
                        el
                      );
                    })
                    .map((el, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'baseline' }}>
                        <Typography variant='subtitle1'>{el}:</Typography>
                        <Typography>{data[el]}</Typography>
                      </Box>
                    ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </DisableableBox>
      </Condition>
    </Box>
  );
};

export default Details;
