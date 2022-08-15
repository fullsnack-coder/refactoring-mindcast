import MessageScreen, {
  MessageScreenProps,
} from '@system/molecules/MessageScreen'

type Props = {
  noDataMessage: string
  extraProps?: Omit<MessageScreenProps, 'message'>
}

const NoDataComponent: React.FC<Props> = ({
  noDataMessage = 'There is no data :(',
  extraProps = {},
}) => {
  return (
    <MessageScreen
      containerProps={{
        alignItems: 'center',
      }}
      message={noDataMessage}
      {...extraProps}
    />
  )
}

export default NoDataComponent
