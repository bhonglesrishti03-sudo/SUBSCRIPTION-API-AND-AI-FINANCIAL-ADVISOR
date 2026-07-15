import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  Box,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import DashboardLayout from "../components/layout/DashboardLayout";
import useSubscriptions from "../hooks/useSubscriptions";
import SubscriptionTable from "../components/subscription/SubscriptionTable";
import SearchBar from "../components/subscription/SearchBar";
import EmptyState from "../components/dashboard/EmptyState";
import SubscriptionForm from "../components/subscription/SubscriptionForm";

import { createSubscription , updateSubscription, deleteSubscription} from "../services/subscriptionService";
import StatusFilter from "../components/subscription/StatusFilter";
import CategoryFilter from "../components/subscription/CategoryFilter";

export default function Subscriptions() {
  const { subscriptions, loading, error , refetch} = useSubscriptions();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [openForm, setOpenForm] = useState(false);
  const [editingSubscription, setEditingSubscription] = useState(null);


const filteredSubscriptions = useMemo(() => {
  const filtered = subscriptions.filter((sub) => {
    const matchesSearch = sub.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      sub.status.toLowerCase() === statusFilter.toLowerCase();

    const matchesCategory =
      categoryFilter === "All" ||
      sub.category.toLowerCase() === categoryFilter.toLowerCase();

    return (
      matchesSearch &&
      matchesStatus &&
      matchesCategory
    );
  });

  

  return filtered;
}, [
  subscriptions,
  search,
  statusFilter,
  categoryFilter,
]);

 const handleSubmitSubscription = async (data) => {
  try {
    if (editingSubscription) {
      await updateSubscription(editingSubscription._id, data);

      toast.success("Subscription updated successfully!");
    } else {
      await createSubscription(data);

      toast.success("Subscription created successfully!");
    }

    await refetch();

    setOpenForm(false);

    setEditingSubscription(null);
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Something went wrong."
    );
  }
};

const handleDeleteSubscription = async (id) => {
  try {
    await deleteSubscription(id);

    await refetch();

    toast.success("Subscription deleted successfully!");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to delete subscription."
    );
  }
};
  if (loading) {
    return (
      <DashboardLayout
        title="Subscriptions"
        eyebrow="Manage"
      >
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout
        title="Subscriptions"
        eyebrow="Manage"
      >
        <Typography color="error">
          {error}
        </Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      title="Subscriptions"
      eyebrow="Manage"
    >
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            My Subscriptions
          </Typography>

          <Typography color="text.secondary">
            Manage all your recurring subscriptions
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => {
  setEditingSubscription(null);
  setOpenForm(true);
}}
        >
          Add Subscription
        </Button>
      </Box>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
      />
<Box
  display="flex"
  gap={2}
  alignItems="center"
  flexWrap="wrap"
  mb={3}
>
  <StatusFilter
    value={statusFilter}
    onChange={setStatusFilter}
  />

  <CategoryFilter
    value={categoryFilter}
    onChange={setCategoryFilter}
  />
</Box>
      {/* Table */}
      {subscriptions.length === 0 ? (
  <EmptyState />
) : (
  <SubscriptionTable
    subscriptions={filteredSubscriptions}
    onEdit={(subscription) => {
      setEditingSubscription(subscription);
      setOpenForm(true);
    }}
    onDelete={handleDeleteSubscription}
  />
)}
      

      {/* Add Subscription Dialog */}
      <SubscriptionForm
  open={openForm}
  onClose={() => {
    setOpenForm(false);
    setEditingSubscription(null);
  }}
  onSubmit={handleSubmitSubscription}
  initialData={editingSubscription}
/>
    </DashboardLayout>
  );
}