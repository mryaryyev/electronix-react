import { Box, Stack } from "@mui/material"
import Button from "@mui/material/Button"
import TabPanel from "@mui/lab/TabPanel"
import { useSelector } from "react-redux"
import { createSelector } from "reselect"
import { retrievePausedOrders } from "./selector"
import { Messages, serverApi } from "../../../libs/config"
import { Order, OrderItem, OrderUpdateInput } from "../../../libs/types/order"
import { Product } from "../../../libs/types/product"
import { sweetErrorHandling } from "../../../libs/sweetAlert"
import { OrderStatus } from "../../../libs/enums/order.enum"
import { useGlobals } from "../../hooks/useGlobals.ts"
import OrderService from "../../services/OrderService"
import { T } from "../../../libs/types/common"

/** REDUX SLICE & SproductCTOR */
const pausedOrdersRetriever = createSelector(
  retrievePausedOrders,
  pausedOrders => ({ pausedOrders }),
)

interface PausedOrdersProps {
  setValue: (input: string) => void
}

export default function PausedOrders(props: PausedOrdersProps) {
  const { setValue } = props
  const { authMember, setOrderBuilder } = useGlobals()
  const { pausedOrders } = useSelector(pausedOrdersRetriever)

  /** HANDLERS */

  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2)
      const orderId = e.target.value
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.DELETE,
      }

      const confirmation = window.confirm("Do you want to delete the order?")
      if (confirmation) {
        const order = new OrderService()
        await order.updateOrder(input)
        // ORDER REBUILD
        setOrderBuilder(new Date())
      }
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  const processOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2)
      // PAYMENT PROCESS

      const orderId = e.target.value
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.PROCESS,
      }

      const confirmation = window.confirm(
        "Do you want to proceed with payment?",
      )
      if (confirmation) {
        const order = new OrderService()
        await order.updateOrder(input)
        // => PROCESS ORDER
        setValue("2")
        // ORDER REBUILD
        setOrderBuilder(new Date())
      }
    } catch (err) {
      console.log(err)
      sweetErrorHandling(err).then()
    }
  }

  return (
    <TabPanel value={"1"}>
      <Stack>
        {pausedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className={"order-main-box"}>
              <Box className={"order-box-scroll"}>
                {order?.orderItems?.map((item: OrderItem) => {
                  const product = order.productData.find(
                    (ele: Product) => item.productId === ele._id,
                  )
                  if (!product) return null
                  const imagePath = `${serverApi}/${product.productImages[0]}`
                  return (
                    <Box key={item._id} className={"orders-name-price"}>
                      <img
                        src={imagePath}
                        className={"order-dish-img"}
                        alt=""
                      />
                      <p className={"title-dish"}>{product.productName}</p>
                      <Box className={"price-box"}>
                        <p>${item.itemPrice}</p>
                        <img src={"/icons/close.svg"} alt="" />
                        <p>{item.itemQuantity}</p>
                        <img src={"/icons/pause.svg"} alt="" />
                        <p style={{ marginLeft: "15px" }}>
                          ${item.itemQuantity * item.itemPrice}
                        </p>
                      </Box>
                    </Box>
                  )
                })}
              </Box>

              <Box className={"total-price-box"}>
                <Box className={"box-total"}>
                  <p>Product price</p>
                  <p>${order.orderTotal - order.orderDelivery}</p>
                  <img
                    src={"/icons/plus.svg"}
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Delivery cost</p>
                  <p>${order.orderDelivery}</p>
                  <img
                    src={"/icons/pause.svg"}
                    style={{ marginLeft: "20px" }}
                    alt=""
                  />
                  <p>Total</p>
                  <p>${order.orderTotal}</p>
                </Box>
                <Button
                  value={order._id}
                  variant="contained"
                  color="secondary"
                  className={"cancel-button"}
                  onClick={deleteOrderHandler}
                >
                  Cancel
                </Button>
                <Button
                  value={order._id}
                  variant="contained"
                  color="primary"
                  className={"pay-button"}
                  onClick={processOrderHandler}
                >
                  Payment
                </Button>
              </Box>
            </Box>
          )
        })}

        {(!pausedOrders || pausedOrders.length === 0) && (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 300, height: 300 }}
                alt=""
              />
            </Box>
          )}
      </Stack>
    </TabPanel>
  )
}
