import { useEffect, useRef, useState } from 'react'
import './App.css'

const profile = {
  name: '백기림', // 이름
  role: '풀스택 개발자 지망',
  github: 'https://github.com/girint',
  resume: '', // 이력서 PDF 링크
  email: 'bgr1614@naver.com', // 연락용 이메일
}

const projects = [
  {
    id: 'clone',
    name: '홈페이지 클론',
    capability: '직접 구현하는 힘',
    title: '보이던 화면을, 내 코드로.',
    description:
      '입문 단계에서 AI 없이 직접 코드를 작성해 리디북스 웹툰 페이지를 구현했습니다. 약 2주 동안 HTML, CSS, JavaScript만으로 완성하며 코드가 흘러가는 방식을 스스로 파악했습니다.',
    meta: [
      ['형태', '개인 프로젝트'],
      ['기간', '2025.09.05 ~ 09.19 (약 2주)'],
      ['기술', 'HTML · CSS · JavaScript · 카카오 도서 검색 API'],
    ],
    skills: [
      ['직접 구현', '슬라이더 5개를 함수 하나로 통합하고, 반복되는 카드 구조를 템플릿으로 정리했습니다.'],
      ['API 연동', '카카오 도서 검색 API를 호출해 표지·제목·저자를 화면에 채웠습니다.'],
      ['화면 대응', '검색창 패널, 탭, 자동 배너 동작과 767px 이하 모바일 레이아웃을 구현했습니다.'],
    ],
    limit:
      '별점·리뷰 수는 학습용 더미 데이터이고, 모바일 대응은 한 구간(767px 이하)만 구현했습니다. 디자인과 에셋은 원본 사이트를 참고했습니다.',
    image: null as string | null,
    repository: 'https://github.com/girint/firsrt_project',
  },
  {
    id: 'backend',
    name: '풋살 경기 예약 사이트',
    capability: '서버와 DB를 설계하는 힘',
    title: '서버와 데이터의 흐름을 설계하다.',
    description:
      '4인 팀 프로젝트에서 백엔드를 전담해 풋살 경기 예약 서비스를 Flask로 구현했습니다. 앱 구조, DB 모델링, 인증, 예약 로직을 맡았습니다.',
    meta: [
      ['형태', '4인 팀 · 백엔드 전담'],
      ['기간', '2025.09.23 ~ 10.01 (9일)'],
      ['기술', 'Flask · SQLAlchemy · Flask-Migrate · SQLite'],
    ],
    skills: [
      ['백엔드 구조', 'Blueprint 7개로 기능을 나누고 회원·구장·경기·마이페이지 기능을 구현했습니다.'],
      ['DB 설계', 'SQLAlchemy 모델 6개와 관계를 설계하고 Flask-Migrate로 스키마 변경을 관리했습니다.'],
      ['인증·예약 로직', '해시 비밀번호 로그인과 세션 인증, 정원 기반 예약 상태 계산, 신청·취소를 구현했습니다.'],
    ],
    limit:
      '신청·취소의 소유자 검증과 중복 신청 방지가 보완 과제입니다. 결제는 가상 충전이며 DB는 SQLite를 사용했습니다.',
    image: null as string | null,
    repository: 'https://github.com/FOREVER-4season/team_4',
  },
  {
    id: 'yolo',
    name: 'YOLO 프로젝트',
    capability: '데이터로 개선하는 힘',
    title: '데이터를 바로잡고, 다시 학습하다.',
    description:
      '어린이집 영상에서 위험 행동 신호를 탐지해 교사의 확인을 돕는 보조 시스템을 팀으로 개발했습니다. 데이터 수집과 정제, 라벨링 기준 수립부터 학습, 결과 분석 후 데이터 수정까지 진행했습니다.',
    meta: [
      ['형태', '팀 프로젝트'],
      ['담당', '데이터 수집·정제 · 라벨링 · 학습 · 결과 분석'],
      ['기술', 'YOLO · Python'],
    ],
    skills: [
      ['데이터 구축', '학습 데이터를 수집·정제하고 라벨링 기준을 세워 라벨링했습니다.'],
      ['모델 학습', '16개 클래스 동시 학습은 mAP50 20%에 그쳤습니다. 클래스를 줄여 명확화하고 개별 학습한 결과 75%로 개선했습니다.'],
      ['원인 분석', '통합 모델은 71%로 목표에 못 미쳤고, 클래스 불균형 등 원인을 분석했습니다.'],
    ],
    limit:
      '목표(개별 90%, 통합 85%)에는 미치지 못했습니다. 이 도구는 학대 여부를 판단하지 않고 교사의 확인을 돕는 신호 탐지 보조 도구입니다.',
    image: null as string | null,
    repository: 'https://github.com/girint/Child_Abuse_Sign1',
  },
  {
    id: 'chatbot',
    name: 'AI 챗봇 서비스',
    capability: '연결하고 이끄는 힘',
    title: '기술을 하나의 서비스로.',
    description:
      'OpenAI API로 8가지 분야의 AI 챗봇 서비스를 만들었습니다. 백엔드와 DB 설계, PM을 맡아 프롬프트 설계, 프론트·백엔드 연계 명세서 작성, 팀 코드 점검을 진행했습니다.',
    meta: [
      ['형태', '팀 프로젝트'],
      ['담당', '백엔드 · DB · PM'],
      ['기술', 'Flask · OpenAI API · SQLAlchemy'],
    ],
    skills: [
      ['백엔드·API', 'Flask Blueprint로 회원·공지·챗봇 8개 API를 구성하고 OpenAI API를 연동했습니다.'],
      ['프롬프트·DB 설계', '분야별 시스템 프롬프트와 10개 모델의 DB 구조를 설계했습니다.'],
      ['PM·협업', '역할 분담, 코드 점검, 프론트·백엔드 연계용 명세서 작성·배부를 맡았습니다.'],
    ],
    limit:
      '대화 저장 연동이 미완성이고, 이전 대화를 포함하지 않는 단발 응답 구조입니다. 챗봇 8개의 중복 코드를 통합하는 것이 개선 과제입니다.',
    image: null as string | null,
    repository: 'https://github.com/AI-Chatbot-KingHead/Chatbot_Project',
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
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
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
        <div className="header-right">
          <span className="header-note">더 높이, 더 단단하게.</span>
          <nav className="header-links" aria-label="바로가기">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {profile.resume && (
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                이력서
              </a>
            )}
            {profile.email && <a href={`mailto:${profile.email}`}>연락처</a>}
          </nav>
        </div>
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
              <p className="identity">
                {profile.name && `${profile.name} · `}
                {profile.role} · Python · Flask · SQL · JavaScript
              </p>
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
                      <span>
                        {completed ? '경험 완료 ✓' : `EXPERIENCE 0${index + 1}`}
                      </span>
                    </span>
                    <h2>{item.name}</h2>
                    <p>{item.capability}</p>
                    <span className="food-link">경험 살펴보기 ↗</span>
                  </button>
                )
              })}
            </div>

            {growth === 4 && !isGrowing && (
              <div className="finale">
                <p className="finale-title">단단히 딛고, 더 높은 곳으로.</p>
                <p>아직 만나지 않은 경험들이 기다리고 있습니다.</p>
                <div className="finale-links">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer">
                    GitHub ↗
                  </a>
                  {profile.resume && (
                    <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                      이력서 ↗
                    </a>
                  )}
                  {profile.email && <a href={`mailto:${profile.email}`}>연락하기 ↗</a>}
                </div>
              </div>
            )}
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

                <dl className="project-meta">
                  {project.meta.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>

                {project.image && (
                  <figure className="project-media">
                    <img src={project.image} alt={`${project.name} 화면`} />
                  </figure>
                )}

                <div className="skill-list">
                  {project.skills.map(([title, description]) => (
                    <section className="skill-card" key={title}>
                      <h2>{title}</h2>
                      <p>{description}</p>
                    </section>
                  ))}
                </div>

                <p className="project-limit">
                  <strong>한계와 개선 방향</strong> {project.limit}
                </p>

                <div className="detail-actions">
                  <a href={project.repository} target="_blank" rel="noopener noreferrer">
                    GitHub에서 구현 과정 보기 ↗
                  </a>

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
        <span>PORTFOLIO{profile.name && ` — ${profile.name}`}</span>
      </footer>
    </div>
  )
}