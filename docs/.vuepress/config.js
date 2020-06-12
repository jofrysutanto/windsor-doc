module.exports = {
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
      // {
      //   title: 'Guides',   // required
      //   path: '/guides/basic',      // optional, link of the title, which should be an absolute path and must exist
      //   collapsable: false, // optional, defaults to true
      //   sidebarDepth: 1,    // optional, defaults to 1
      //   children: [
      //     '/guides/basic',
      //     '/guides/conditional',
      //     '/guides/repeater-flex',
      //     '/guides/clone',
      //     '/guides/blueprints',
      //   ]
      // },
      // {
      //   title: 'Rules',   // required
      //   path: '/rules/intro',      // optional, link of the title, which should be an absolute path and must exist
      //   collapsable: false, // optional, defaults to true
      //   sidebarDepth: 1,    // optional, defaults to 1
      //   children: [
      //     '/rules/intro',
      //   ]
      // }
    ]
  }
}
