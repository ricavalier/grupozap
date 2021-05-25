
const routes = [
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/*zapimoveis/',
    component: () => import('layouts/ZapLayout.vue'),
    children: [
      { name: 'ZapHome', path: '', component: () => import('pages/zapimoveis/Home.vue') },
      { name: 'ZapAluguel', path: 'aluguel', component: () => import('pages/zapimoveis/Aluguel.vue') },
      { name: 'ZapVenda', path: 'venda', component: () => import('pages/zapimoveis/Venda.vue') },
      { name: 'ZapDetalhes', path: 'detalhes/:id', component: () => import('pages/zapimoveis/Detalhes.vue') },
      { name: 'ZapErro', path: '*', component: () => import('pages/zapimoveis/Home.vue') }
    ]
  },
  {
    path: '/*vivareal/',
    component: () => import('layouts/VivaLayout.vue'),
    children: [
      { name: 'VivaHome', path: '', component: () => import('pages/vivareal/Home.vue') },
      { name: 'VivaAluguel', path: 'aluguel', component: () => import('pages/vivareal/Aluguel.vue') },
      { name: 'VivaVenda', path: 'venda', component: () => import('pages/vivareal/Venda.vue') },
      { name: 'VivaDetalhes', path: 'detalhes/:id', component: () => import('pages/vivareal/Detalhes.vue') },
      { name: 'VivaErro', path: '*', component: () => import('pages/vivareal/Home.vue') }
    ]
  },

  {
    path: '*',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
  // Always leave this as last one,
  // but you can also remove it
  // {
  //   path: '*',
  //   component: () => import('pages/Error404.vue')
  // }
]

export default routes
