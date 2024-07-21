/* eslint-disable react/no-unknown-property */

const Loader = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props} width={50} height={50}>
    <radialGradient
      id="a"
      cx={0.66}
      fx={0.66}
      cy={0.313}
      fy={0.313}
      gradientTransform="scale(1.5)"
    >
      <stop
        offset={0}
        stopColor="#BFE3FF"
        style={{
          '--darkreader-inline-stopcolor': '#6d006d',
        }}
      />
      <stop
        offset={0.3}
        stopColor="#BFE3FF"
        stopOpacity={0.9}
        style={{
          '--darkreader-inline-stopcolor': '#6d006d',
        }}
      />
      <stop
        offset={0.6}
        stopColor="#BFE3FF"
        stopOpacity={0.6}
        style={{
          '--darkreader-inline-stopcolor': '#6d006d',
        }}
      />
      <stop
        offset={0.8}
        stopColor="#BFE3FF"
        stopOpacity={0.3}
        style={{
          '--darkreader-inline-stopcolor': '#6d006d',
        }}
      />
      <stop
        offset={1}
        stopColor="#BFE3FF"
        stopOpacity={0}
        style={{
          '--darkreader-inline-stopcolor': '#6d006d',
        }}
      />
    </radialGradient>
    <circle
      transform-origin="center"
      fill="none"
      stroke="url(#a)"
      strokeWidth={26}
      strokeLinecap="round"
      strokeDasharray="200 1000"
      cx={100}
      cy={100}
      r={70}
    >
      <animateTransform
        type="rotate"
        attributeName="transform"
        calcMode="spline"
        dur={2}
        values="360;0"
        keyTimes="0;1"
        keySplines="0 0 1 1"
        repeatCount="indefinite"
      />
    </circle>
    <circle
      transform-origin="center"
      fill="none"
      opacity={0.2}
      stroke="#BFE3FF"
      strokeWidth={26}
      strokeLinecap="round"
      cx={100}
      cy={100}
      r={70}
      style={{
        '--darkreader-inline-stroke': '#ff6dff',
      }}
    />
  </svg>
)

export default Loader
