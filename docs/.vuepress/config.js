module.exports = {
  title: 'ACF Windsor',
  themeConfig: {
    sidebar: [
      {
        title: 'About',   // required
        path: '/',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/',
          '/getting-started',
          '/ide',
          '/configurations',
        ]
      },
      {
        title: 'Guides',   // required
        path: '/guides/basic',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/guides/basic',
          '/guides/conditional',
          '/guides/clone'
        ]
      },
      {
        title: 'Blueprints',   // required
        path: '/blueprints',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: []
      },
      {
        title: 'Transform Rules',   // required
        path: '/rules',      // optional, link of the title, which should be an absolute path and must exist
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: []
      },
      // {
      //   title: 'Questions',   // required
      //   path: '/questions',      // optional, link of the title, which should be an absolute path and must exist
      //   collapsable: false, // optional, defaults to true
      //   sidebarDepth: 1,    // optional, defaults to 1
      //   children: [
      //   ]
      // },
    ]
  },
  plugins: [ 'tabs' ]
}
