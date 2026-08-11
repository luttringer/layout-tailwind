const isProd = process.env.NODE_ENV === 'production'

module.exports =
{
  plugins: [
    require('postcss-nesting'),
    require('@tailwindcss/postcss'),
    isProd && require('cssnano')({ preset: 'default' }),
  ].filter(Boolean),
}
