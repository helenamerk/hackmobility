import { StyleSheet } from "react-native";
import colors from "../config/colors";

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Roboto"
  },
  close: {
    margin: 5,
    position: "absolute",
    top: 0,
    left: 0,
    width: 25,
    height: 25,
    color: colors.BLUE
  },
  helpText: {
    color: colors.TORCH_RED,
    fontSize: 15,
    justifyContent: "space-between"
  },
  subtleLink: {
    color: colors.BLACK,
    fontSize: 17,
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    justifyContent: "space-between"
  },
  clickable: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    marginBottom: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.5)"
  },
  logo: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    alignSelf: "center",
    marginBottom: 20
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    backgroundColor: colors.WHITE
  },
  formFields: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    backgroundColor: colors.WHITE,
    paddingTop: 20
  },
  buttonStyleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)",
    height: 100
  },
  buttonStyleText: {
    color: colors.WHITE,
    textAlign: "left",
    height: 50,
    fontSize: 40
  },
  blueButtonStyleContainer: {
    width: "30%",
    alignItems: "center",
    flexDirection: "row-reverse",
    justifyContent: "flex-start",
    backgroundColor: colors.BLUE,
    marginBottom: 12,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.7)"
  },
  inverseButtonStyleContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.WHITE,
    marginBottom: 12,
    paddingVertical: 12,
    padding: 12,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.BLUE
  },
  inverseButtonStyleText: {
    color: colors.BLUE,
    textAlign: "left",
    height: 20
  },
  subtitleView: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 0,
    paddingTop: 5
  },
  checkBoxView: {
    flex: 1,
    flexDirection: "row",
    paddingLeft: 0,
    paddingTop: 5
  },
  subtitleText: {
    paddingLeft: 0,
    color: colors.REAL_GREY
  },
  alertText: {
    paddingLeft: 0,
    color: colors.TORCH_RED
  }
});

export default styles;
