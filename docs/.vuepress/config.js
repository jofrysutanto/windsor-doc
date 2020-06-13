module.exports = {
  title: 'ACF Windsor',
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'jofrysutanto/windsor',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'jofrysutanto/windsor-doc',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!',
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
