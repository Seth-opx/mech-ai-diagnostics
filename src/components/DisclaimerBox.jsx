import { DISCLAIMER } from '../utils/constants.js'

export default function DisclaimerBox({ text = DISCLAIMER }) {
  return <div className="disclaimer">{text}</div>
}
