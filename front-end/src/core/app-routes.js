const appRoutes = Object.freeze({
  searchBox: {
    path: '/',
    params: null,
  },
  itemsList: {
    path: '/items',
    params: { search: 'search' },
  },
  itemDetail: {
    path: '/item/:id',
    params: null,
  },
});

export default appRoutes;
