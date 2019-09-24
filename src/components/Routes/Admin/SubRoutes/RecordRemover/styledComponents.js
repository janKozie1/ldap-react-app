import styled, { css } from 'styled-components'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme: { sizes } }) =>
        css`calc(${sizes.margins.formMargin} * 2)`};
`

export const Type = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    > p {
        margin: 0;
        margin-right: 20px;
    }
`
export const Lola = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: ${({ theme: { sizes } }) =>
        css`calc(${sizes.margins.formMargin} * 2)`};
`
// {/* <S.Container>
//             <S.Type>
//                 <Select
//                     options={OPTIONS}
//                     current={current}
//                     selectFunction={handleSelect}
//                     width={'150px'}
//                 />
//             </S.Type>
//             {/* {current._id === 'relation' ? (
//                 <GroupForm
//                     loading={loading}
//                     response={response}
//                     onSubmit={onSubmit}
//                 />
//             ) : (
//                 <Form
//                     loading={loading}
//                     response={response}
//                     onSubmit={onSubmit}
//                     fields={fields[current._id]}
//                 />
//             )} */}
//         </S.Container> */}
