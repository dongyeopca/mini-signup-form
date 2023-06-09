// TODO: 이 곳에 정답 코드를 작성해주세요.

const warning = {
    id: '5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.',
    pw: '8~16자 영문 대 소문자, 숫자를 사용하세요.',
    'pw-check': '비밀번호가 일치하지 않습니다.',
    common: '필수 정보입니다.',
}

const element = {
    form: document.getElementById('form'),
    id: document.getElementById('id'),
    pw: document.getElementById('pw'),
    'pw-check': document.getElementById('pw-check'),
    submit: document.getElementById('submit'),
    modal: document.getElementById('modal'),
    'confirm-id': document.getElementById('confirm-id'),
    'confirm-pw': document.getElementById('confirm-pw'),
    'approve-btn': document.getElementById('approve-btn'),
    'cancel-btn': document.getElementById('cancel-btn'),
    'font-control-box': document.getElementById('font-control-box'),
    'increase-font-btn': document.getElementById('increase-font-btn'),
    'decrease-font-btn': document.getElementById('decrease-font-btn'),
}

const msgElement = {
    id: document.getElementById('id-msg'),
    pw: document.getElementById('pw-msg'),
    'pw-check': document.getElementById('pw-check-msg'),
}

// 1.autofocus
window.onload = () => {
    element.id.focus()
}

// 2.유효성 검사
const rule = {
    id: (target) => {
        const idRule = new RegExp('^[a-z0-9_-]{5,20}$', 'g')
        return idRule.test(target.value)
    },
    pw: (target) => {
        const passwordRule = new RegExp('^[0-9a-zA-Z]{8,16}$', 'g')
        return passwordRule.test(target.value)
    },
    'pw-check': (target) => {
        return target.value === element.pw.value
    },
}

const focusOut = (target) => {
    console.log(target.id)
    if (!target.value.length) {
        msgElement[target.id].innerText = warning.common
        return false
    }
    if (!rule[target.id](target)) {
        msgElement[target.id].innerText = warning[target.id]
        return false
    } else {
        msgElement[target.id].innerText = ''
        return true
    }
}

window.addEventListener(
    'blur',
    (e) => {
        if (['id', 'pw', 'pw-check'].includes(e.target.id)) focusOut(e.target)
    },
    true
)

// 모달 처리
window.addEventListener('submit', (e) => {
    e.preventDefault()
    if (
        focusOut(element.id) &&
        focusOut(element.pw) &&
        focusOut(element['pw-check'])
    ) {
        element['confirm-id'].innerText = element.id.value
        element['confirm-pw'].innerText = element.pw.value
        element.modal.showModal()
        element['approve-btn'].onclick = () => {
            element.modal.close()
            alert('가입되었습니다 🥳 ')
            element.form.reset()
        }
        element['cancel-btn'].onclick = () => {
            element.modal.close()
        }
    }
})

// 폰트 사이즈 조절
element['font-control-box'].addEventListener('click', (e) => {
    if (!element.form.style.fontSize) element.form.style.fontSize = 16
    let curSize = Number(element.form.style.fontSize.slice(0, -2))
    switch (e.target) {
        case element['increase-font-btn']:
            element.form.style.fontSize = curSize + 1
            break
        case element['decrease-font-btn']:
            element.form.style.fontSize = curSize - 1
            break
    }
    curSize == 20
        ? (element['increase-font-btn'].disabled = true)
        : (element['increase-font-btn'].disabled = false)
    curSize == 12
        ? (element['decrease-font-btn'].disabled = true)
        : (element['decrease-font-btn'].disabled = false)
})
