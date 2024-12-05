const courseList = [
  {
    title: "Brand",
    korean_text: "브랜드디자인프로젝트",
    english_text: "BrandDesignProject",
    path: "brand-design",
    advisor: "이장섭",
    advisor_eng: "Lee Jangsup",
    description:
      "정체성을 구축하기 위한 시각적 응용 항목과 이를 대외적으로 확산시키고 일관적으로 관리하는 시스템 전체의 디자인을 포함하는 ‘브랜드 디자인’ 개념을 이해하고, 기존의 브랜드와 사회의 움직임을 관찰하여 개인, 단체, 서비스, 제품, 작품을 넘어 문화적 현상, 조직적인 움직임, 생각의 방식으로 확장되는 새로운 브랜드 디자인을 제안한다.",
    description_eng:
      "This class is dedicated to comprehending the concept of 'brand design', encompassing the visual elements used to create an identity and the holistic design system responsible for its external dissemination and consistent management. Students delve into the study of existing brands and societal trends, enabling them to envision innovative brand designs that transcend the realm of individuals, groups, services, products, and artworks, reaching into the domain of cultural phenomena, organizational movements, and shifts in thinking.",
  },
  {
    title: "Graphic",
    korean_text: "그래픽디자인프로젝트",
    english_text: "GraphicDesignProject",
    path: "graphic-design",
    advisor: "배민기",
    advisor_eng: "Bae Minkee",
    description:
      "시각디자인의 조형적 특성과 다양한 활용에 대해 숙지하고, 디자인 작업에 있어 제작의 방향 설정 및 표현 방법과 커뮤니케이션 컨셉을 이해한다. 체계적인 프로세스를 통해 개인 주제의 일관성 있는 디자인 구현과 창조적인 표현을 가능하게 하고, 그래픽디자인의 외연을 넓히는 경험을 쌓는 것을 목표로 한다.",
    description_eng:
      "Students gain insights into the foundational attributes and diverse applications of visual design. They grasp the essence of setting the production direction, exploring expressive methods, and comprehending the communicative principles inherent in design work. This class is meticulously structured to foster a systematic approach, facilitating the seamless execution of design and fostering creative expression of individual themes. Ultimately, it aspires to cultivate experiences that expand the horizons of graphic design.",
  },
  {
    title: "UX/UI",
    korean_text: "UI/UX디자인프로젝트",
    english_text: "UX/UIDesignProject",
    path: "ux-ui-design",
    advisor: "김신혜",
    advisor_eng: "Kim Shinhye",
    description:
      "UI/UX 디자인은 현대 비즈니스와 기술 분야에서 핵심 역할을 한다. 뛰어난 UI/UX 디자인은 제품 또는 서비스의 성공에 결정적인 역할을 하며 사용자의 만족도와 충성도를 높인다. 본 수업을 통해 UI/UX의 기본 개념과 사용자 연구, 디자인 도구와 기술, 유용한 디자인 원칙, 그리고 실제 프로젝트로 적용하는 과정을 통해 현업에서 요구되는 문제해결 역량을 향상 시키는 것이 목표이다.",
    description_eng:
      "UI/UX design stands as a pivotal element in contemporary business and technology landscapes. Exceptional UI/UX design significantly influences the triumph of a product or service, fostering heightened user satisfaction and unwavering loyalty. The objective of this course is to enhance problem-solving competencies vital to the domain. It achieves this by imparting fundamental UI/UX concepts, user research methodologies, design tools and techniques, valuable design principles, and the practical application of these skills in real-world projects.",
  },
  {
    title: "Media",
    korean_text: "미디어디자인프로젝트",
    english_text: "MediaDesignProject",
    path: "media-design",
    advisor: "이준원",
    advisor_eng: "Lee Junwon",
    description:
      "미디어를 디스플레이로서의 도구가 아닌 디자인의 요소로 인식하고, 이 특성을 적극 활용하는 프로세스를 학습한다. 확장된 미디어 개념의 역사를 이해하고 이를 기반으로 커뮤니케이션을 위한 콘텐츠를 제작한다. 개인 주제를 미디어 중심으로 재해석하여 다른 분야와 구별되는 자신만의 미디어 해석 방법과 표현 방법을 토론한다.",
    description_eng:
      "In this course, students explore the perspective of media as a fundamental design element, transcending its conventional role as a mere display tool. They learn to harness this unique characteristic actively. Within this context, students delve into the historical evolution of the expanded media concept and cultivate the skills to craft meaningful communication content. Through this journey, each student embarks on an exploration of their distinct media interpretation and expression methods, reinterpreting individual themes with a specialized focus on the realm of media.",
  },
  {
    title: "Product Interaction",
    korean_text: "제품인터랙션디자인프로젝트",
    english_text: "ProductInteractionDesignProject",
    path: "product-interaction-design",
    advisor: "조상은",
    advisor_eng: "Jo Sangeun",
    description:
      "인간, 사회, 문화, 경제, 기술, 환경의 변화 속에서 미래 가치를 조망하는 주관적 통찰과 해석을 기반으로 디자인에 접근한다. ‘나’의 관점으로 해석한 변화하는 현상을 표현할 수 있는 디자인 언어를 개발하고, 이를 제품인터랙션 시스템 디자인을 통해 구체화하여 방향성을 제시한다.",
    description_eng:
      "This class approaches design from a subjective viewpoint, interpreting future values in the context of evolving human dynamics, societal changes, cultural shifts, economic fluctuations, technological advances, and environmental considerations. Students develop a design language that expresses changing phenomena from their unique perspective, materializing their vision through product interaction system design.",
  },
  {
    title: "Living",
    korean_text: "리빙디자인프로젝트",
    english_text: "LivingDesignProject",
    path: "living-design",
    advisor: "장성연",
    advisor_eng: "Jang Sungyun",
    description:
      "인간의 삶을 구성하는 환경에서 필요한 사물 및 공간을 탐구하여 새로운 리빙의 형태를 디자인한다. 재료 본연의 물성을 고민하고 미학적 아름다움에 기반하여 리빙디자인에 대한 새로운 방향성을 제안한다.",
    description_eng:
      "Students craft a novel way of living by exploring the essential objects and spaces that shape our daily environment. They propose a new direction in living design, emphasizing aesthetic beauty and the inherent qualities of materials.",
  },
  {
    title: "Mobile",
    korean_text: "모빌리티디자인프로젝트",
    english_text: "MobileDesignProject",
    path: "mobile-design",
    advisor: "유병준",
    advisor_eng: "Yoo Byungjun",
    description:
      "본 프로젝트는 <제품 혹은 오브젝트>의 큰 범주 안에서 모빌리티 디자인을 목표로 한다. 모빌리티 디자인의 개념은 기존의 운송기기 디자인과 다르게 보다 스마트하고, 지속가능하며, 인간중심적이다. 더 이상 단순한 'People mover'가 아닌 'People helper'로 인류에게 보다 혁신적이고 가치 있는 미래 모빌리티의 비전을 제안한다.",
    description_eng:
      "This project focuses on mobility design within the broader <product or object) category. It departs from traditional transportation design by prioritizing innovation, sustainability, and human-centered approaches. In line with this evolving trend, students propose a visionary concept of future mobility that transcends the role of a simple 'people mover' and transforms into a 'people helper' that adds significant value to humanity.",
  },
  {
    title: "Space",
    korean_text: "공간디자인프로젝트",
    english_text: "SpaceDesignProject",
    path: "space-design",
    advisor: "안성모",
    advisor_eng: "Ahn Sungmo",
    description:
      "공간을 형성시키는 필수적인 장치이자 우리가 일상 속에서 항상 접하는 ‘문’이라는 공간요소를 통해 공간이 담고 있는 복잡한 힘들을 규명하고 열림과 닫힘의 고유한 작동방식을 디자인 함으로써 방문자와 거주자 간의 새로운 소통의 관계를 제시한다. 이러한 과정을 통해 자신만의 시각으로 공간 고유의 속성과 문제를 드러내고 공간에 대한 사고를 확장한다.",
    description_eng:
      "Through an exploration of the 'door' as a crucial architectural component we encounter daily, students identify the complex spatial dynamics it embodies. They design unique methods for opening and closing doors, fostering a fresh form of communication between visitors and residents. This process unveils distinct properties and challenges within the realm of space.",
  },
];

export default courseList;
