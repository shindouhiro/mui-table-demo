'use client';
import Link from '@/components/UI/Link';
import { Stack } from '@mui/material';

const menus = [
  {
    title: '编排',
    link: './',
    active: true,
  },
  {
    title: '发布历史',
    link: './history',
  },
];

export default function BoardSubMenu() {
  return (
    <Stack
      direction="row"
      gap={4}
    >
      {menus.map((menu) => (
        <Link
          key={menu.title}
          href={menu.link}
          sx={{ fontSize: 16 }}
          color={`${menu.active ? 'primary' : 'grey.800'}`}
          underline="none"
        >
          {menu.title}
        </Link>
      ))}
    </Stack>
  );
}
