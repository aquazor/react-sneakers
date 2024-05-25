import { Box, Paper, Skeleton } from '@mui/material';

const PageSkeleton = () => {
  return (
    <>
      <Box
        display={'grid'}
        gridTemplateColumns={'repeat(auto-fit, minmax(200px, 1fr))'}
        justifyContent={'center'}
        alignItems={'end'}
        gap={2}
        my={4}
      >
        <Skeleton variant="rounded" height={24} />
        <Skeleton variant="rounded" height={24} />
        <Skeleton variant="rounded" height={24} />
        <Skeleton variant="rounded" height={24} />

        <Box display={'grid'} gap={1}>
          <Skeleton variant="rounded" height={36} />
          <Skeleton variant="rounded" height={36} />
        </Box>
      </Box>

      <div>
        <Box
          component="ul"
          my={5}
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, 260px)',
            placeContent: 'center',
            gap: 3,
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Paper
              elevation={2}
              sx={{ borderRadius: '5px 15px', overflow: 'hidden' }}
              key={index}
            >
              <Skeleton variant="rectangular" height={280} />

              <Box display={'grid'} gap={1} p={2}>
                <Skeleton variant="rounded" height={20} />
                <Skeleton variant="rounded" height={14} width={60} />
                <Skeleton variant="rounded" height={18} width={70} />
              </Box>
            </Paper>
          ))}
        </Box>
      </div>
    </>
  );
};

export default PageSkeleton;
