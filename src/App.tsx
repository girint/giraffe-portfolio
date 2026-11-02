import { useEffect, useRef, useState } from 'react'
import './App.css'

const projects = [
  {
    id: 'clone',
    name: '홈페이지 클론',
    capability: '스스로 구현하는 힘',
    title: '보이던 화면을, 내 코드로.',
    description:
      'AI 없이 직접 코드를 작성하며 홈페이지를 구현했습니다. 화면을 재현하는 것에서 시작해 반응형 구성과 JavaScript 동작까지 시도했습니다.',
    skills: [
      ['화면 구현', '홈페이지의 구조와 스타일을 직접 코드로 옮겼습니다.'],
      ['반응형 이해', '화면 크기 변화에 대응하는 구성을 시도했습니다.'],
      ['동작 구현', 'JavaScript로 사용자 행동에 반응하는 기능을 시도했습니다.'],
    ],
    repository: 'https://github.com/girint/firsrt_project',
  },
  {
    id: 'backend',
    name: '백엔드 · DB · 배포',
    capability: '서비스를 연결하는 힘',
    title: '화면 뒤의 흐름을 연결하다.',
    description:
      'Flask로 백엔드 기능을 구현하고 데이터베이스를 연결했습니다. Docker 배포까지 진행하며 서비스의 전체 워크플로우를 경험했습니다.',
    skills: [
      ['백엔드 구현', 'Flask로 화면 뒤의 요청 처리 기능을 구현했습니다.'],
      ['데이터 연동', '데이터베이스와 서비스의 흐름을 연결했습니다.'],
      ['배포 경험', 'Docker를 활용해 배포 과정까지 진행했습니다.'],
    ],
    repository: null,
  },
  {
    id: 'yolo',
    name: 'YOLO 프로젝트',
    capability: '학습하고 개선하는 힘',
    title: '데이터를 준비하고, 다시 학습하다.',
    description:
      'YOLO 기반 아동학대 의심 상황 감지 프로젝트를 진행했습니다. 데이터를 직접 수집하고 라벨링했으며, 재학습을 반복하며 모델 개선에 집중했습니다.',
    skills: [
      ['데이터 구축', '학습에 필요한 데이터를 수집하고 라벨링했습니다.'],
      ['모델 학습', '준비한 데이터로 YOLO 모델을 학습시켰습니다.'],
      ['반복 개선', '재학습을 반복하며 개선의 시행착오를 경험했습니다.'],
    ],
    repository: 'https://github.com/girint/Child_Abuse_Sign1.git',
  },
  {
    id: 'chatbot',
    name: 'RAG · LLM 챗봇',
    capability: '배운 것을 통합하는 힘',
    title: '기술을 하나의 서비스로.',
    description:
      'RAG와 LLM을 활용한 챗봇 사이트를 만들었습니다. 프롬프트와 응답 제약을 설계하고 MongoDB 저장·조회, 프론트엔드와 백엔드를 연결했습니다.',
    skills: [
      ['AI 활용 설계', '목적에 맞는 프롬프트와 응답 제약을 설계했습니다.'],
      ['데이터 관리', 'MongoDB로 데이터를 저장하고 불러왔습니다.'],
      ['서비스 통합', '화면과 서버, AI의 요청·응답 흐름을 연결했습니다.'],
    ],
    repository: 'https://github.com/girint/Chatbot_Project.git',
  },
]

type ProjectId = (typeof projects)[number]['id']

function useAnimatedGrowth(target: number) {
  const [value, setValue] = useState(target)
  const currentValue = useRef(target)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const from = currentValue.current

    let frameId = 0
    let startTime: number | null = null

    const finishImmediately = () => {
      cancelAnimationFrame(frameId)
      currentValue.current = target
      setValue(target)
    }

    const handlePreferenceChange = () => {
      if (media.matches) finishImmediately()
    }

    media.addEventListener('change', handlePreferenceChange)

    if (media.matches || from === target) {
      frameId = requestAnimationFrame(finishImmediately)
    } else {
      const delay = 500
      const duration = 1800

      const animate = (time: number) => {
        if (startTime === null) startTime = time

        const elapsed = time - startTime
        const progress = Math.min(
          Math.max((elapsed - delay) / duration, 0),
          1,
        )

        // 最初と最後を穏やかにする補間
        const eased = progress * progress * (3 - 2 * progress)
        const next = from + (target - from) * eased

        currentValue.current = next
        setValue(next)

        if (progress < 1) {
          frameId = requestAnimationFrame(animate)
        }
      }

      frameId = requestAnimationFrame(animate)
    }

    return () => {
      cancelAnimationFrame(frameId)
      media.removeEventListener('change', handlePreferenceChange)
    }
  }, [target])

  return value
}
// 시작과 끝이 부드럽게 이어지는 보간

function Giraffe({ growth }: { growth: number }) {
  const neckLength = 95 + growth * 38
  const headY = 310 - neckLength

  // 단계별 풍경이 서서히 나타나는 값
  const reveal = (stage: number) =>
    Math.min(1, Math.max(0, growth - stage + 1))

  const skyOpacity = Math.min(1, growth / 4)
  const cameraScale = 1 - growth * 0.035
  const cameraOffsetY = 450 * (1 - cameraScale)

  return (
    <svg
      className="giraffe"
      viewBox="0 0 500 500"
      role="img"
      aria-label="경험에 따라 목이 자라고 주변 풍경이 넓어지는 기린"
    >
      {/* 성장할수록 드러나는 하늘 */}
      <rect
        x="0"
        y="0"
        width="500"
        height="465"
        rx="36"
        fill="#dcecf0"
        opacity={skyOpacity * 0.65}
      />

      {/* 먼 산과 언덕 */}
      <g opacity={reveal(3)}>
        <path
          d="M0 325 L95 210 L175 290 L290 160 L420 295 L500 230 L500 465 L0 465 Z"
          fill="#c8d7ca"
        />
        <path
          d="M0 365 Q125 265 250 350 Q375 275 500 345 L500 465 L0 465 Z"
          fill="#b7cbb1"
        />
      </g>

      {/* 주변 나무 */}
      <g opacity={reveal(2)}>
        <path
          d="M70 385 L70 265 M430 390 L430 255"
          stroke="#a7865e"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <ellipse cx="70" cy="260" rx="38" ry="49" fill="#98b88c" />
        <ellipse cx="430" cy="248" rx="42" ry="55" fill="#a5bf91" />
      </g>

      {/* 최종 단계의 구름 */}
      <g fill="#fffdf7" opacity={reveal(4)}>
        <ellipse cx="110" cy="100" rx="38" ry="13" />
        <ellipse cx="135" cy="91" rx="26" ry="18" />
        <ellipse cx="370" cy="78" rx="45" ry="14" />
        <ellipse cx="343" cy="69" rx="25" ry="18" />
      </g>

      {/* 같은 세계 안에서 점차 드러나는 지면과 길 */}
      <path
        d="M0 420 Q250 375 500 420 L500 480 L0 480 Z"
        fill="#e5e4cc"
      />

      <path
        d="M275 395 Q305 420 365 480"
        fill="none"
        stroke="#d4bc91"
        strokeWidth="27"
        opacity={reveal(1)}
      />

      {/* 장면이 조금 넓어져도 UI 크기는 유지 */}
      <g
        transform={`translate(
          ${250 * (1 - cameraScale)}
          ${cameraOffsetY}
        ) scale(${cameraScale})`}
      >
        <ellipse
          cx="260"
          cy="451"
          rx="132"
          ry="15"
          fill="#c9c4af"
          opacity="0.6"
        />

        <path
          d="M190 355 L190 445 M230 365 L230 445
             M305 365 L305 445 M340 355 L340 445"
          stroke="#bc873c"
          strokeWidth="17"
          strokeLinecap="round"
        />

        <ellipse
          cx="266"
          cy="345"
          rx="92"
          ry="48"
          fill="#dbad5b"
        />

        {/* 목 길이와 머리 위치를 함께 변경 */}
        <rect
          x="190"
          y={headY + 25}
          width="46"
          height={335 - headY}
          rx="22"
          fill="#dbad5b"
        />

        {/* 무늬를 늘려 찌그러뜨리지 않고 간격을 조정 */}
        {Array.from({ length: 6 }, (_, index) => {
          const position = (index + 1) / 7
          const visible = Math.min(
            1,
            Math.max(0, (growth + 2 - index) * 0.8),
          )

          return (
            <ellipse
              key={index}
              cx={index % 2 === 0 ? 204 : 222}
              cy={headY + 55 + position * (260 - headY)}
              rx="8"
              ry="11"
              fill="#986435"
              opacity={visible}
            />
          )
        })}

        <g transform={`translate(0 ${headY})`}>
          <path
            d="M202 8 L197 -14 M225 8 L230 -14"
            stroke="#986435"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <ellipse cx="182" cy="15" rx="17" ry="9" fill="#dbad5b" />
          <ellipse cx="240" cy="15" rx="17" ry="9" fill="#dbad5b" />
          <rect
            x="187"
            y="3"
            width="56"
            height="58"
            rx="25"
            fill="#dbad5b"
          />
          <ellipse cx="221" cy="48" rx="28" ry="17" fill="#e9c580" />
          <circle cx="222" cy="24" r="4" fill="#342c25" />
          <path
            d="M229 49 Q235 54 241 49"
            fill="none"
            stroke="#765333"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>

        <ellipse cx="280" cy="332" rx="15" ry="12" fill="#986435" />
        <ellipse cx="313" cy="354" rx="13" ry="10" fill="#986435" />
        <ellipse cx="245" cy="358" rx="12" ry="9" fill="#986435" />
      </g>

      {/* 가까운 풀 */}
      <g
        stroke="#8fa079"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M40 460 L35 443 M40 460 L47 440" />
        <path d="M115 470 L108 452 M115 470 L122 449" />
        <path d="M455 462 L449 443 M455 462 L464 445" />
      </g>
    </svg>
  )
}

export default function App() {
  const [selected, setSelected] = useState<number | null>(null)
  const [fedIds, setFedIds] = useState<ProjectId[]>([])
  const project = selected === null ? null : projects[selected]
  const growth = fedIds.length
  const animatedGrowth = useAnimatedGrowth(growth)
const isGrowing = Math.abs(animatedGrowth - growth) > 0.001

useEffect(() => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant',
  })
}, [selected])

  function feedProject(id: ProjectId) {
    setFedIds((previous) =>
      previous.includes(id) ? previous : [...previous, id],
    )
    setSelected(null)
  }

  return (
    <div className="app">
      <header className="site-header">
        <button className="brand" onClick={() => setSelected(null)}>
          GIRIN<span> / 성장 기록</span>
        </button>
        <span className="header-note">더 높이, 더 단단하게.</span>
      </header>

      <main>
        {project === null ? (
          <section className="home panel" key="home">
            <div className="introduction">
              <p className="eyebrow">A JOURNEY OF GROWTH</p>
              <h1>
                이 기린은
                <br />
                경험을 먹고
                <br />
                자랍니다<span>.</span>
              </h1>
              <p className="intro-description">
                화면을 만드는 것에서 시작해,
                <br />
                서버와 데이터를 연결하고 AI를 서비스로.
                <br />
                프로젝트를 살펴보고 경험을 먹여주세요.
              </p>
              <div className="progress" aria-live="polite">
                쌓인 경험 <strong>{growth}</strong> / 4
              </div>
            </div>

            <div className="scene">
              <Giraffe growth={animatedGrowth} />
              <p className="scene-caption" aria-live="polite">
                {isGrowing
                  ? '경험이 쌓이며, 새로운 풍경이 열리고 있습니다.'
                  : growth === 4
                  ? '경험이 쌓일수록, 바라보는 세계도 넓어졌습니다.'
                  : '작은 경험 하나가 다음 성장을 지탱합니다.'}
              </p>
            </div>

            <div className="food-list" aria-label="프로젝트 먹이">
              {projects.map((item, index) => {
                const completed = fedIds.includes(item.id)

                return (
                  <button
                    className={`food-card ${completed ? 'is-fed' : ''}`}
                    key={item.id}
                    onClick={() => setSelected(index)}
                    disabled={isGrowing}
                  >
                    <span className="food-top">
                      <span className="leaf" aria-hidden="true" />
                      <span>{completed ? '경험 완료 ✓' : `EXPERIENCE 0${index + 1}`}</span>
                    </span>
                    <h2>{item.name}</h2>
                    <p>{item.capability}</p>
                    <span className="food-link">경험 살펴보기 ↗</span>
                  </button>
                )
              })}
            </div>
          </section>
        ) : (
          <section className="detail panel" key={project.id}>
            <button className="back-button" onClick={() => setSelected(null)}>
              ← 기린에게 돌아가기
            </button>

            <div className="detail-layout">
              <aside className="bone-navigation" aria-label="성장 단계">
                <p className="eyebrow">GROWTH STRUCTURE</p>
                <div className="bone-list">
                  {projects.map((item, index) => (
                    <button
                      key={item.id}
                      className={`bone ${selected === index ? 'active' : ''}`}
                      onClick={() => setSelected(index)}
                      aria-current={selected === index ? 'step' : undefined}
                      aria-label={`${index + 1}단계 ${item.name}`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </button>
                  ))}
                </div>
                <p className="bone-note">경험이 성장을 지탱합니다.</p>
              </aside>

              <article className="project-content">
                <p className="eyebrow">
                  EXPERIENCE 0{(selected ?? 0) + 1} / {project.name}
                </p>
                <h1>{project.title}</h1>
                <p className="project-description">{project.description}</p>

                <div className="media-placeholder">
                  <span>PROJECT PREVIEW</span>
                  <p>실제 프로젝트 화면을 넣을 자리입니다.</p>
                </div>

                <div className="skill-list">
                  {project.skills.map(([title, description]) => (
                    <section className="skill-card" key={title}>
                      <h2>{title}</h2>
                      <p>{description}</p>
                    </section>
                  ))}
                </div>

                <div className="detail-actions">
                  {project.repository ? (
                    <a
                      href={project.repository}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub에서 구현 과정 보기 ↗
                    </a>
                  ) : (
                    <span className="pending-link">프로젝트 링크 준비 중</span>
                  )}

                  {fedIds.includes(project.id) ? (
                    <button
                      className="primary-button completed-button"
                      onClick={() => setSelected(null)}
                    >
                      이미 성장에 더해진 경험 ✓
                    </button>
                  ) : (
                    <button
                      className="primary-button"
                      onClick={() => feedProject(project.id)}
                    >
                      이 경험으로 먹이 주기 →
                    </button>
                  )}
                </div>
              </article>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <span>계속 배우고, 연결하고, 성장합니다.</span>
        <span>PORTFOLIO — FIRST DRAFT</span>
      </footer>
    </div>
  )
}