import React from 'react';
import {
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function RenderHelp({messagetype}){
    return(
      <TouchableOpacity onPress={() => {
        Alert.alert(messagetype.title,messagetype.subtitle,)
      }}>
        <View style={{marginHorizontal: 5}}>
          <Icon name="comment-question-outline" color="red" size={20}/>
        </View>
      </TouchableOpacity>
    )
}


export const HelpMessage = {
    duration: {
        title: "프로젝트 기간이란?",
        subtitle: "프로젝트를 진행하실 일수를 입력하시면 됩니다. \n\n※프로젝트 기간은 최소 15일 이상입니다.",
    },
    experienceduration: {
        title: "프로젝트 체험 기간이란?",
        subtitle: "프로젝트의 체험기간을 입력하시면 됩니다.\n\n※체험기간동안 튜티는 보증금 지불없이 생성하신 프로젝트를 체험할 수 있습니다.\n※체험 기간은 최소 1일에서 7일 까지입니다.",
    },
    dailyStudyTime: {
        title: "최소 학습시간이란?",
        subtitle: "튜티가 일일 학습을 진행할때 수행하여야 하는 최소 학습시간입니다.\n튜티는 프로젝트 진행간 최소 학습시간을 충족하여야 합니다.",
    },
    repeatstrength: {
        title: "복습 강도란?",
        subtitle: "최소 학습시간을 기준으로 전날 공부한 내용을 복습하는 정도입니다. \n※복습강도의 범위는 1단계부터 10단계입니다. \n\n예시) 최소학습시간 : 1시간, 복습 강도 : 3단계인 경우 최소 학습시간 중 18분(최소학습시간 * 복습강도/10)을 복습하는 일정이 생성됩니다. ",
    },
    howToAuth:{
        title: "프로젝트 인증 미션이란?",
        subtitle: "프로젝트에 참여한 튜티가 수행하여야하는 일일 학습 인증 미션입니다.\n※일일 학습 인증 방식은 text입력과 파일 업로드를 제공합니다. \n※해당 방식에서 자유롭게 기술하여 주시면 됩니다.\n\n예시)\n금일 학습내용 정리하여 텍스트 업로드\n예시)\n금일 푼 문제에 대하여 오답노트 작성 후 사진 업로드",
    },
    deposit: {
        title: "보증금 이란?",
        subtitle: "프로젝트에 튜티가 참여하기 위하여 처음 지불하는 금액입니다. 해당 보증금은 프로젝트 종료 후 환급됩니다.\n※보증금은 일일 학습 인증 횟수를 기준으로 환급됩니다.\n\n예시)\n30일간 진행되는 프로젝트에서 \n튜티1은 30번의 일일인증을 수행 -> 100% 환급\n튜티2는 15번의 일일 인증을 수행 -> 보증금의 50% 환급",
    },
}

